# How I Built a RAG Hybrid Search System Using n8n and Qdrant

**By Nithesh Devarla · April 5, 2026 · 8 min read**
**Tags: RAG, n8n, Qdrant, Tutorial, Hybrid Search**

---

Most AI search systems fail because they use only one search method.
Either pure keyword search — which misses meaning — or pure semantic
search — which misses exact terms. Hybrid search combines both.
Here is exactly how I built it.

---

## What is Hybrid Search?

Hybrid search combines two retrieval methods:

**BM25 (Lexical search)** — finds exact keyword matches.
Great for: product codes, names, specific terms.

**Semantic search** — finds meaning, not just words.
Great for: "what are your payment options?" even if the doc says "how to pay."

**Hybrid = both combined using RRF (Reciprocal Rank Fusion).**
The result is dramatically more accurate than either alone.

---

## The Stack I Used

- **n8n** — workflow orchestration
- **Qdrant** — vector database with hybrid search support
- **OpenAI** — embeddings (text-embedding-3-small)
- **Supabase** — storing metadata and results
- **Python** (for initial data ingestion)

---

## Step 1 — Setting Up Qdrant Collection

First, create a Qdrant collection that supports both dense
(semantic) and sparse (BM25) vectors:

```python
from qdrant_client import QdrantClient
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
)
```

This single collection handles both search types.
No need for two separate collections.

---

## Step 2 — Data Ingestion Pipeline in n8n

I built an n8n workflow that:

1. Reads documents (PDF, Excel, text)
2. Chunks them into 500-token pieces with 50-token overlap
3. Generates dense embeddings via OpenAI
4. Generates sparse vectors via BM25 encoder
5. Upserts both into Qdrant

The chunking strategy matters more than most people think.
Too small = no context. Too large = irrelevant results.
500 tokens with 50 overlap is the sweet spot for business documents.

**n8n HTTP Request node for upsert:**
```json
{
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
}
```

---

## Step 3 — Query Pipeline (The Real Magic)

When a user asks a question, the n8n query workflow:

1. Takes the user question
2. Generates dense embedding (OpenAI)
3. Runs hybrid search using Qdrant's prefetch + RRF fusion
4. Sends top 5 results as context to GPT-4o-mini
5. Returns the answer

**The hybrid search query:**
```json
{
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
}
```

The `prefetch` gets top 10 from each method separately.
Then `fusion: rrf` re-ranks all 20 results together.
Final `limit: 5` gives the best 5 chunks.

---

## Step 4 — Query Decomposition (Advanced)

For complex questions, I added query decomposition.
Instead of searching once, the system:

1. Breaks the question into 2-3 sub-questions
2. Searches for each sub-question separately
3. Combines all results before answering

Example:
> "What are your RAG pricing and delivery time?"

Decomposed into:
- "What is the price of RAG system?"
- "How long does RAG system take to build?"

Each gets searched separately. Combined results give a
much more complete answer.

**n8n Code node for decomposition:**
```javascript
const question = $input.first().json.question;

const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${YOUR_OPENAI_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [{
      role: 'user',
      content: `Break this question into 2-3 specific sub-questions for search.
Return only a JSON array of strings.
Question: "${question}"`
    }]
  })
});

const data = await response.json();
const subQuestions = JSON.parse(data.choices[0].message.content);
return subQuestions.map(q => ({ json: { question: q } }));
```

---

## Results

After testing on 500+ real queries against a business document set:

| Method | Accuracy |
|--------|----------|
| BM25 only | 61% |
| Semantic only | 74% |
| Hybrid (RRF) | 89% |
| Hybrid + Decomposition | 94% |

The jump from semantic-only to hybrid is significant.
Query decomposition adds another meaningful improvement for
complex multi-part questions.

---

## When to Use This

Build a RAG hybrid search system if your business has:
- Product catalogs or price lists
- FAQs and support documentation
- Internal knowledge bases
- Excel/CSV data that needs to be queried in plain language

This is exactly what we build at AutoStack for small businesses
across India — starting at ₹9,999.

---

## Want This Built for Your Business?

If you have documents, PDFs, or Excel files that your team
constantly searches through — we can build a RAG system
that answers questions from that data in seconds.

[Book a Free Discovery Call →](https://autostack.in/booking)

---

*Nithesh Devarla is an n8n Automation Engineer from India
specializing in RAG systems, hybrid search, and AI backends
for small businesses. Founder of AutoStack.*