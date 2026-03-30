// ============================================================
// AUTOSTACK — Minimalist Chatbot Widget
// ============================================================

(function () {
  'use strict';

  const STYLES = `
    .chatbot-bubble {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9000;
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: #7C5CFC;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(124,92,252,0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      transition: all 0.2s ease;
    }
    .chatbot-bubble:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(124,92,252,0.45);
    }
    .chatbot-bubble.open { transform: scale(0.92); }

    .chatbot-panel {
      position: fixed;
      bottom: 88px;
      right: 24px;
      z-index: 9001;
      width: 380px;
      max-height: 500px;
      background: #12121A;
      border-radius: 16px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.06);
      display: none;
      flex-direction: column;
      overflow: hidden;
      animation: chatFadeIn 0.25s ease;
    }
    .chatbot-panel.open { display: flex; }

    @keyframes chatFadeIn {
      from { opacity: 0; transform: translateY(10px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .chatbot-header {
      padding: 16px 18px;
      background: rgba(255,255,255,0.03);
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .chatbot-header-icon {
      width: 32px;
      height: 32px;
      background: #7C5CFC;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }
    .chatbot-header-info h4 {
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #F0F0F5;
      margin: 0;
    }
    .chatbot-header-info span {
      font-family: 'Inter', sans-serif;
      font-size: 11px;
      color: #55556A;
    }
    .chatbot-close {
      margin-left: auto;
      background: none;
      border: none;
      color: #55556A;
      font-size: 18px;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      transition: all 0.15s;
    }
    .chatbot-close:hover { color: #8A8A9A; background: rgba(255,255,255,0.05); }

    .chatbot-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      max-height: 320px;
      min-height: 180px;
    }

    .chat-msg { margin-bottom: 10px; display: flex; gap: 8px; }
    .chat-msg.bot { justify-content: flex-start; }
    .chat-msg.user { justify-content: flex-end; }

    .chat-msg .msg-content {
      max-width: 80%;
      padding: 10px 14px;
      border-radius: 12px;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      line-height: 1.5;
    }
    .chat-msg.bot .msg-content {
      background: rgba(255,255,255,0.05);
      color: #C0C0D0;
      border-bottom-left-radius: 4px;
    }
    .chat-msg.user .msg-content {
      background: #7C5CFC;
      color: white;
      border-bottom-right-radius: 4px;
    }

    .chat-msg .typing-dots {
      display: inline-flex;
      gap: 4px;
      padding: 4px 0;
    }
    .chat-msg .typing-dots span {
      width: 5px;
      height: 5px;
      background: #55556A;
      border-radius: 50%;
      animation: typingBounce 1.4s ease infinite;
    }
    .chat-msg .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .chat-msg .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes typingBounce {
      0%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-5px); }
    }

    .chatbot-input-area {
      display: flex;
      gap: 8px;
      padding: 12px 14px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    .chatbot-input {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 8px;
      background: rgba(255,255,255,0.03);
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      color: #F0F0F5;
    }
    .chatbot-input:focus { outline: none; border-color: rgba(124,92,252,0.5); }
    .chatbot-input::placeholder { color: #55556A; }

    .chatbot-send {
      padding: 10px 16px;
      background: #7C5CFC;
      border: none;
      border-radius: 8px;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: white;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .chatbot-send:hover { background: #6344E0; }

    @media (max-width: 480px) {
      .chatbot-panel { right: 12px; left: 12px; width: auto; bottom: 80px; }
      .chatbot-bubble { bottom: 16px; right: 16px; width: 48px; height: 48px; }
    }
  `;

  const style = document.createElement('style');
  style.textContent = STYLES;
  document.head.appendChild(style);

  const bubble = document.createElement('button');
  bubble.className = 'chatbot-bubble';
  bubble.innerHTML = '💬';
  bubble.setAttribute('aria-label', 'Open chat');
  document.body.appendChild(bubble);

  const panel = document.createElement('div');
  panel.className = 'chatbot-panel';
  panel.innerHTML = `
    <div class="chatbot-header">
      <div class="chatbot-header-icon">⚡</div>
      <div class="chatbot-header-info">
        <h4>AutoStack AI</h4>
        <span>Ask me anything</span>
      </div>
      <button class="chatbot-close" aria-label="Close chat">×</button>
    </div>
    <div class="chatbot-messages" id="chatbot-messages">
      <div class="chat-msg bot">
        <div class="msg-content">Hi! 👋 I'm the AutoStack assistant. Ask me about our services, pricing, or how we can help your business.</div>
      </div>
    </div>
    <div class="chatbot-input-area">
      <input type="text" class="chatbot-input" id="chatbot-input" placeholder="Type your question..." autocomplete="off">
      <button class="chatbot-send" id="chatbot-send">Send</button>
    </div>
  `;
  document.body.appendChild(panel);

  bubble.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('open');
    bubble.classList.toggle('open', isOpen);
    bubble.innerHTML = isOpen ? '✕' : '💬';
    if (isOpen) document.getElementById('chatbot-input').focus();
  });

  panel.querySelector('.chatbot-close').addEventListener('click', () => {
    panel.classList.remove('open');
    bubble.classList.remove('open');
    bubble.innerHTML = '💬';
  });

  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');
  const messagesEl = document.getElementById('chatbot-messages');

  function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${type}`;
    msg.innerHTML = `<div class="msg-content">${text}</div>`;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return msg;
  }

  function addTyping() {
    const msg = document.createElement('div');
    msg.className = 'chat-msg bot';
    msg.id = 'typing-indicator';
    msg.innerHTML = `<div class="msg-content"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('typing-indicator');
    if (t) t.remove();
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';
    addTyping();

    try {
      const res = await fetch(CONFIG.N8N_BASE_URL + CONFIG.WEBHOOKS.CHAT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text })
      });

      removeTyping();

      if (res.ok) {
        const data = await res.json();
        addMessage(data.answer || data.output || 'Thanks for your question! Please book a call for detailed help.', 'bot');
      } else {
        addMessage("Having trouble connecting. Please try again or <a href='booking.html' style='color:#9B82FC;'>book a call</a>.", 'bot');
      }
    } catch (err) {
      removeTyping();
      addMessage("I'm offline right now. <a href='booking.html' style='color:#9B82FC;'>Book a free call</a> and we'll help you! 🙂", 'bot');
    }
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });
})();
