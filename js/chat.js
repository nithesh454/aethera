// ============================================================
// CHATBOT LOGIC
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('chat-input');
  const btn = document.getElementById('chat-send-btn');
  const historyContainer = document.getElementById('chat-history');

  if (!input || !btn || !historyContainer) return;

  // Track conversation history for context
  let conversationHistory = [];

  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg chat-${sender}`;
    msgDiv.textContent = text;
    historyContainer.appendChild(msgDiv);
    historyContainer.scrollTop = historyContainer.scrollHeight;
  }

  function addTypingIndicator() {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg chat-ai typing-msg`;
    msgDiv.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
    historyContainer.appendChild(msgDiv);
    historyContainer.scrollTop = historyContainer.scrollHeight;
    return msgDiv;
  }

  async function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    // 1. Show user message
    addMessage(text, 'user');
    input.value = '';
    btn.disabled = true;

    // 2. Add to history
    conversationHistory.push({ role: 'user', content: text });

    // 3. Show typing indicator
    const typingIndicator = addTypingIndicator();

    try {
      // If user provided a specific Supabase Edge Function URL, handle it.
      // Alternatively, we use the n8n webhook defined in config for the chatbot.
      const aiResponse = await fetchChatEndpoint(text, conversationHistory);
      
      typingIndicator.remove();
      addMessage(aiResponse, 'ai');
      conversationHistory.push({ role: 'assistant', content: aiResponse });

    } catch (err) {
      console.error(err);
      typingIndicator.remove();
      addMessage("I'm sorry, I'm currently unable to connect to the server. Please try again later.", 'ai');
    } finally {
      btn.disabled = false;
      input.focus();
    }
  }

  // Allow Enter key
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  });

  btn.addEventListener('click', handleSend);
});

async function fetchChatEndpoint(question, history) {
  // Use n8n Webhook Chat or Supabase Edge function depending on what's active.
  // We'll try a fallback to the configuration's POST endpoint if applicable.

  // Let's assume you've configured a chat webhook in config.js:
  // CONFIG.N8N_BASE_URL + '/webhook/chat'
  
  const webhookUrl = "https://gudmitai.app.n8n.cloud/webhook/chat"; // defined by user previously

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, history })
  });

  if (!res.ok) {
    throw new Error('Chat API returned ' + res.status);
  }

  const data = await res.json();
  
  // Try to extract the response text gracefully in case n8n structure varies
  if (data.output) return data.output;
  if (data.reply) return data.reply;
  if (data.message) return data.message;
  
  return data;
}
