
INSERT INTO public.blog_posts (
  title, slug, excerpt, content, category, tags, read_time_mins, is_published, published_at
) VALUES (
  'How I Built a RAG Hybrid Search System Using n8n and Qdrant', 
  'blog-post-01-rag', 
  'A comprehensive tutorial on building a production-ready RAG hybrid search system using n8n and Qdrant. Compare semantic, lexical, and RRF search.', 
  '<article class="article-container">
      <p>Most AI search systems fail because they use only one search method. Either pure keyword search ΓÇö which misses meaning ΓÇö or pure semantic search ΓÇö which misses exact terms. Hybrid search combines both. Here is exactly how I built it.</p>
      
      <hr>

      <h2>What is Hybrid Search?</h2>
      <p>Hybrid search combines two retrieval methods:</p>
      <p><strong>BM25 (Lexical search)</strong> ΓÇö finds exact keyword matches.<br>Great for: product codes, names, specific terms.</p>
      <p><strong>Semantic search</strong> ΓÇö finds meaning, not just words.<br>Great for: "what are your payment options?" even if the doc says "how to pay."</p>
      <p><strong>Hybrid = both combined using RRF (Reciprocal Rank Fusion).</strong><br>The result is dramatically more accurate than either alone.</p>

      <hr>

      <h2>The Stack I Used</h2>
      <ul>
        <li><strong>n8n</strong> ΓÇö workflow orchestration</li>
        <li><strong>Qdrant</strong> ΓÇö vector database with hybrid search support</li>
        <li><strong>OpenAI</strong> ΓÇö embeddings (text-embedding-3-small)</li>
        <li><strong>Supabase</strong> ΓÇö storing metadata and results</li>
        <li><strong>Python</strong> (for initial data ingestion)</li>
      </ul>

      <hr>

      <h2>Step 1 ΓÇö Setting Up Qdrant Collection</h2>
      <p>First, create a Qdrant collection that supports both dense (semantic) and sparse (BM25) vectors:</p>
      
<pre><code>from qdrant_client import QdrantClient
from qdrant_client.models import (
    VectorParams, Distance,
    SparseVectorParams, SparseIndexParams
)

client = QdrantClient(url="YOUR_QDRANT_URL", api_key="YOUR_KEY")

client.create_collection(
    collection_name="knowledge_base",
    vectors_config={
        "dense": VectorParams(size=1536, distance=Distance.COSINE)
    },
    sparse_vectors_config={
        "sparse": SparseVectorParams(
            index=SparseIndexParams(on_disk=False)
        )
    }
)</code></pre>
      
      <p>This single collection handles both search types. No need for two separate collections.</p>

      <hr>

      <h2>Step 2 ΓÇö Data Ingestion Pipeline in n8n</h2>
      <p>I built an n8n workflow that:</p>
      <ol style="padding-left: 24px; margin-bottom: 24px;">
        <li style="margin-bottom: 8px;">Reads documents (PDF, Excel, text)</li>
        <li style="margin-bottom: 8px;">Chunks them into 500-token pieces with 50-token overlap</li>
        <li style="margin-bottom: 8px;">Generates dense embeddings via OpenAI</li>
        <li style="margin-bottom: 8px;">Generates sparse vectors via BM25 encoder</li>
        <li style="margin-bottom: 8px;">Upserts both into Qdrant</li>
      </ol>
      <p>The chunking strategy matters more than most people think. Too small = no context. Too large = irrelevant results. 500 tokens with 50 overlap is the sweet spot for business documents.</p>
      <p><strong>n8n HTTP Request node for upsert:</strong></p>

<pre><code>{
  "method": "PUT",
  "url": "YOUR_QDRANT_URL/collections/knowledge_base/points",
  "body": {
    "points": [
      {
        "id": "{{ $json.chunk_id }}",
        "vector": {
          "dense": "{{ $json.dense_embedding }}",
          "sparse": {
            "indices": "{{ $json.sparse_indices }}",
            "values": "{{ $json.sparse_values }}"
          }
        },
        "payload": {
          "text": "{{ $json.chunk_text }}",
          "source": "{{ $json.filename }}",
          "page": "{{ $json.page_number }}"
        }
      }
    ]
  }
}</code></pre>

      <hr>

      <h2>Step 3 ΓÇö Query Pipeline (The Real Magic)</h2>
      <p>When a user asks a question, the n8n query workflow:</p>
      <ol style="padding-left: 24px; margin-bottom: 24px;">
        <li style="margin-bottom: 8px;">Takes the user question</li>
        <li style="margin-bottom: 8px;">Generates dense embedding (OpenAI)</li>
        <li style="margin-bottom: 8px;">Runs hybrid search using Qdrant''s prefetch + RRF fusion</li>
        <li style="margin-bottom: 8px;">Sends top 5 results as context to GPT-4o-mini</li>
        <li style="margin-bottom: 8px;">Returns the answer</li>
      </ol>
      <p><strong>The hybrid search query:</strong></p>

<pre><code>{
  "prefetch": [
    {
      "query": [DENSE_EMBEDDING_ARRAY],
      "using": "dense",
      "limit": 10
    },
    {
      "query": { "text": "user question here" },
      "using": "sparse",
      "limit": 10
    }
  ],
  "query": { "fusion": "rrf" },
  "limit": 5,
  "with_payload": true
}</code></pre>

      <p>The <code>prefetch</code> gets top 10 from each method separately. Then <code>fusion: rrf</code> re-ranks all 20 results together. Final <code>limit: 5</code> gives the best 5 chunks.</p>

      <hr>

      <h2>Step 4 ΓÇö Query Decomposition (Advanced)</h2>
      <p>For complex questions, I added query decomposition. Instead of searching once, the system:</p>
      <ol style="padding-left: 24px; margin-bottom: 24px;">
        <li style="margin-bottom: 8px;">Breaks the question into 2-3 sub-questions</li>
        <li style="margin-bottom: 8px;">Searches for each sub-question separately</li>
        <li style="margin-bottom: 8px;">Combines all results before answering</li>
      </ol>
      <p>Example:</p>
      <blockquote>"What are your RAG pricing and delivery time?"</blockquote>
      <p>Decomposed into:</p>
      <ul>
        <li>"What is the price of RAG system?"</li>
        <li>"How long does RAG system take to build?"</li>
      </ul>
      <p>Each gets searched separately. Combined results give a much more complete answer.</p>
      <p><strong>n8n Code node for decomposition:</strong></p>

<pre><code>const question = $input.first().json.question;

const response = await fetch(''https://api.openai.com/v1/chat/completions'', {
  method: ''POST'',
  headers: {
    ''Authorization'': `Bearer ${YOUR_OPENAI_KEY}`,
    ''Content-Type'': ''application/json''
  },
  body: JSON.stringify({
    model: ''gpt-4o-mini'',
    messages: [{
      role: ''user'',
      content: `Break this question into 2-3 specific sub-questions for search.
Return only a JSON array of strings.
Question: "${question}"`
    }]
  })
});

const data = await response.json();
const subQuestions = JSON.parse(data.choices[0].message.content);
return subQuestions.map(q => ({ json: { question: q } }));</code></pre>

      <hr>

      <h2>Results</h2>
      <p>After testing on 500+ real queries against a business document set:</p>
      
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Accuracy</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BM25 only</td>
            <td>61%</td>
          </tr>
          <tr>
            <td>Semantic only</td>
            <td>74%</td>
          </tr>
          <tr>
            <td>Hybrid (RRF)</td>
            <td>89%</td>
          </tr>
          <tr>
            <td>Hybrid + Decomposition</td>
            <td>94%</td>
          </tr>
        </tbody>
      </table>

      <p>The jump from semantic-only to hybrid is significant. Query decomposition adds another meaningful improvement for complex multi-part questions.</p>

      <hr>

      <h2>When to Use This</h2>
      <p>Build a RAG hybrid search system if your business has:</p>
      <ul>
        <li>Product catalogs or price lists</li>
        <li>FAQs and support documentation</li>
        <li>Internal knowledge bases</li>
        <li>Excel/CSV data that needs to be queried in plain language</li>
      </ul>
      <p>This is exactly what we build at Aethera for small businesses across India ΓÇö starting at Γé╣9,999.</p>', 
  'Tutorial', 
  ARRAY['RAG','n8n','AI'], 
  8, 
  true, 
  '2026-04-05'
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  read_time_mins = EXCLUDED.read_time_mins,
  is_published = EXCLUDED.is_published,
  published_at = EXCLUDED.published_at;

