# 🔧 Aethera — All n8n Workflows
## Complete workflow descriptions + JSON structures

---

## WORKFLOW 1: Order Intake → Supabase → WhatsApp Alert

**Trigger**: Webhook (POST from your website order form)
**What it does**:
1. Receives form data from website
2. Saves order to Supabase `orders` table
3. Sends YOU a WhatsApp alert with client details
4. Sends client a confirmation email

```json
{
  "name": "01 - Order Intake Pipeline",
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "new-order",
        "httpMethod": "POST",
        "responseMode": "responseNode"
      }
    },
    {
      "name": "Format Order Data",
      "type": "n8n-nodes-base.set",
      "parameters": {
        "values": {
          "string": [
            { "name": "client_name", "value": "={{$json.body.name}}" },
            { "name": "client_email", "value": "={{$json.body.email}}" },
            { "name": "client_phone", "value": "={{$json.body.phone}}" },
            { "name": "business_type", "value": "={{$json.body.business_type}}" },
            { "name": "problem_type", "value": "={{$json.body.problem_type}}" },
            { "name": "problem_description", "value": "={{$json.body.problem_description}}" },
            { "name": "service_name", "value": "={{$json.body.service}}" },
            { "name": "budget_max", "value": "={{$json.body.budget}}" },
            { "name": "status", "value": "new" },
            { "name": "source", "value": "website" }
          ]
        }
      }
    },
    {
      "name": "Save to Supabase",
      "type": "n8n-nodes-base.supabase",
      "parameters": {
        "operation": "create",
        "tableId": "orders",
        "dataToSend": "defineBelow",
        "fieldsUi": {
          "fieldValues": [
            { "fieldId": "client_name", "fieldValue": "={{$json.client_name}}" },
            { "fieldId": "client_email", "fieldValue": "={{$json.client_email}}" },
            { "fieldId": "client_phone", "fieldValue": "={{$json.client_phone}}" },
            { "fieldId": "business_type", "fieldValue": "={{$json.business_type}}" },
            { "fieldId": "problem_type", "fieldValue": "={{$json.problem_type}}" },
            { "fieldId": "problem_description", "fieldValue": "={{$json.problem_description}}" },
            { "fieldId": "service_name", "fieldValue": "={{$json.service_name}}" },
            { "fieldId": "budget_max", "fieldValue": "={{$json.budget_max}}" },
            { "fieldId": "status", "fieldValue": "new" }
          ]
        }
      }
    },
    {
      "name": "WhatsApp Alert to You",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "https://api.whatsapp.com/send",
        "body": {
          "phone": "YOUR_WHATSAPP_NUMBER",
          "message": "🚨 NEW ORDER!\n\nName: {{$json.client_name}}\nEmail: {{$json.client_email}}\nBusiness: {{$json.business_type}}\nProblem: {{$json.problem_type}}\nBudget: ₹{{$json.budget_max}}\nService: {{$json.service_name}}\n\nDescription:\n{{$json.problem_description}}"
        }
      }
    },
    {
      "name": "Send Confirmation Email",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "toEmail": "={{$json.client_email}}",
        "subject": "✅ We received your request — Aethera",
        "text": "Hi {{$json.client_name}},\n\nThank you for reaching out!\n\nWe've received your request for: {{$json.service_name}}\n\nOur team will review your requirements and get back to you within 24 hours.\n\nMeanwhile, you can book a discovery call at: YOUR_BOOKING_LINK\n\nBest,\nNithesh\nAethera"
      }
    },
    {
      "name": "Webhook Response",
      "type": "n8n-nodes-base.respondToWebhook",
      "parameters": {
        "respondWith": "json",
        "responseBody": "={ \"success\": true, \"message\": \"Order received successfully\" }"
      }
    }
  ]
}
```

---

## WORKFLOW 2: Booking Confirmation → Google Calendar + Meet Link

**Trigger**: Webhook (POST from booking form)
**What it does**:
1. Receives booking datetime + client info
2. Creates Google Calendar event
3. Generates Google Meet link
4. Sends client email with meeting details
5. Sends you WhatsApp reminder
6. Saves booking to Supabase

```json
{
  "name": "02 - Booking Confirmation Pipeline",
  "nodes": [
    {
      "name": "Booking Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "book-call",
        "httpMethod": "POST"
      }
    },
    {
      "name": "Create Google Calendar Event",
      "type": "n8n-nodes-base.googleCalendar",
      "parameters": {
        "operation": "create",
        "calendarId": "primary",
        "summary": "Discovery Call — {{$json.body.client_name}} (Aethera)",
        "description": "Client: {{$json.body.client_name}}\nEmail: {{$json.body.client_email}}\nBusiness: {{$json.body.business_type}}\nNeed: {{$json.body.problem_type}}\n\nProblem:\n{{$json.body.problem_description}}",
        "start": "={{$json.body.scheduled_at}}",
        "end": "={{$json.body.scheduled_at_end}}",
        "conferenceDataVersion": 1,
        "conferenceData": {
          "createRequest": {
            "requestId": "={{$json.body.client_email + Date.now()}}",
            "conferenceSolutionKey": { "type": "hangoutsMeet" }
          }
        },
        "attendees": [
          { "email": "={{$json.body.client_email}}" }
        ]
      }
    },
    {
      "name": "Extract Meet Link",
      "type": "n8n-nodes-base.set",
      "parameters": {
        "values": {
          "string": [
            {
              "name": "meet_link",
              "value": "={{$json.conferenceData.entryPoints[0].uri}}"
            }
          ]
        }
      }
    },
    {
      "name": "Save Booking to Supabase",
      "type": "n8n-nodes-base.supabase",
      "parameters": {
        "operation": "create",
        "tableId": "bookings",
        "fieldsUi": {
          "fieldValues": [
            { "fieldId": "client_name", "fieldValue": "={{$('Booking Webhook').json.body.client_name}}" },
            { "fieldId": "client_email", "fieldValue": "={{$('Booking Webhook').json.body.client_email}}" },
            { "fieldId": "scheduled_at", "fieldValue": "={{$('Booking Webhook').json.body.scheduled_at}}" },
            { "fieldId": "meeting_link", "fieldValue": "={{$json.meet_link}}" },
            { "fieldId": "platform", "fieldValue": "google_meet" },
            { "fieldId": "status", "fieldValue": "confirmed" }
          ]
        }
      }
    },
    {
      "name": "Email Client Meeting Details",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "toEmail": "={{$('Booking Webhook').json.body.client_email}}",
        "subject": "📅 Your Call is Confirmed — Aethera",
        "html": "<h2>Your Discovery Call is Confirmed!</h2><p>Hi {{$('Booking Webhook').json.body.client_name}},</p><p>Looking forward to speaking with you!</p><p><strong>Date & Time:</strong> {{$('Booking Webhook').json.body.scheduled_at_display}}</p><p><strong>Google Meet Link:</strong> <a href='{{$json.meet_link}}'>{{$json.meet_link}}</a></p><p>If you need to reschedule, just reply to this email.</p><p>Best,<br>Nithesh<br>Aethera</p>"
      }
    },
    {
      "name": "WhatsApp Alert to You",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "YOUR_WHATSAPP_API_URL",
        "body": {
          "message": "📅 CALL BOOKED!\n\n{{$('Booking Webhook').json.body.client_name}}\n{{$('Booking Webhook').json.body.client_email}}\nTime: {{$('Booking Webhook').json.body.scheduled_at_display}}\nMeet: {{$json.meet_link}}"
        }
      }
    }
  ]
}
```

---

## WORKFLOW 3: 24-Hour Follow-Up Automation

**Trigger**: Schedule (runs every hour, checks for 24hr old new orders)
**What it does**:
1. Queries Supabase for orders that are 24hrs old and still 'new'
2. Sends personalized follow-up email to each
3. Updates status to 'contacted'

```json
{
  "name": "03 - 24hr Follow-Up Automation",
  "nodes": [
    {
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "parameters": {
        "rule": { "interval": [{ "field": "hours", "minutesInterval": 1 }] }
      }
    },
    {
      "name": "Get Uncontacted Orders",
      "type": "n8n-nodes-base.supabase",
      "parameters": {
        "operation": "getAll",
        "tableId": "orders",
        "filterType": "string",
        "filterString": "status=eq.new&created_at=lt.{{ new Date(Date.now() - 24*60*60*1000).toISOString() }}"
      }
    },
    {
      "name": "Send Follow-Up Email",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "toEmail": "={{$json.client_email}}",
        "subject": "Following up on your AI project — Aethera",
        "html": "<p>Hi {{$json.client_name}},</p><p>Just checking in! We reviewed your request for <strong>{{$json.service_name}}</strong> and we have some exciting ideas for your business.</p><p>Would you like to jump on a quick 20-minute call to discuss?</p><p><a href='YOUR_BOOKING_LINK'>👉 Book a Free Call Here</a></p><p>Best,<br>Nithesh</p>"
      }
    },
    {
      "name": "Update Status to Contacted",
      "type": "n8n-nodes-base.supabase",
      "parameters": {
        "operation": "update",
        "tableId": "orders",
        "id": "={{$json.id}}",
        "fieldsUi": {
          "fieldValues": [
            { "fieldId": "status", "fieldValue": "contacted" }
          ]
        }
      }
    }
  ]
}
```

---

## WORKFLOW 4: RAG Chatbot on Website

**Trigger**: Webhook (POST from chatbot widget on website)
**What it does**:
1. Receives user question from website chatbot
2. Searches Qdrant with hybrid search (your expertise!)
3. Generates answer using OpenAI
4. Returns answer to website

```json
{
  "name": "04 - Website RAG Chatbot",
  "nodes": [
    {
      "name": "Chat Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "chat",
        "httpMethod": "POST",
        "responseMode": "responseNode"
      }
    },
    {
      "name": "Generate Embedding",
      "type": "n8n-nodes-base.openAi",
      "parameters": {
        "operation": "text",
        "model": "text-embedding-3-small",
        "input": "={{$json.body.question}}"
      }
    },
    {
      "name": "Hybrid Search Qdrant",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "YOUR_QDRANT_URL/collections/website_knowledge/points/query",
        "headers": {
          "api-key": "YOUR_QDRANT_API_KEY",
          "Content-Type": "application/json"
        },
        "body": {
          "prefetch": [
            {
              "query": "={{$json.data[0].embedding}}",
              "using": "dense",
              "limit": 10
            },
            {
              "query": { "text": "={{$('Chat Webhook').json.body.question}}" },
              "using": "sparse",
              "limit": 10
            }
          ],
          "query": { "fusion": "rrf" },
          "limit": 5,
          "with_payload": true
        }
      }
    },
    {
      "name": "Build Context",
      "type": "n8n-nodes-base.code",
      "parameters": {
        "jsCode": "const results = $input.all();\nconst context = results.map(r => r.json.result?.map(p => p.payload?.text).join('\\n') || '').join('\\n---\\n');\nreturn [{ json: { context, question: $('Chat Webhook').first().json.body.question } }];"
      }
    },
    {
      "name": "Generate Answer",
      "type": "n8n-nodes-base.openAi",
      "parameters": {
        "operation": "message",
        "model": "gpt-4o-mini",
        "messages": {
          "values": [
            {
              "role": "system",
              "content": "You are a helpful assistant for Aethera, an AI automation agency run by Nithesh. Answer questions about our services, pricing, and capabilities based on the context provided. Be friendly and professional. If unsure, suggest booking a call."
            },
            {
              "role": "user",
              "content": "Context:\n{{$json.context}}\n\nQuestion: {{$json.question}}"
            }
          ]
        }
      }
    },
    {
      "name": "Return Answer",
      "type": "n8n-nodes-base.respondToWebhook",
      "parameters": {
        "respondWith": "json",
        "responseBody": "={ \"answer\": \"{{$json.message.content}}\" }"
      }
    }
  ]
}
```

---

## WORKFLOW 5: 1-Hour Call Reminder

**Trigger**: Schedule (runs every 15 minutes)
**What it does**:
1. Checks bookings happening in next 60 minutes
2. Sends WhatsApp reminder to client
3. Sends you a reminder too
4. Marks reminder_sent = true

```json
{
  "name": "05 - Call Reminder (1 Hour Before)",
  "nodes": [
    {
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "parameters": {
        "rule": { "interval": [{ "field": "minutes", "minutesInterval": 15 }] }
      }
    },
    {
      "name": "Get Upcoming Bookings",
      "type": "n8n-nodes-base.supabase",
      "parameters": {
        "operation": "getAll",
        "tableId": "bookings",
        "filterType": "string",
        "filterString": "status=eq.confirmed&reminder_sent=eq.false&scheduled_at=gte.{{ new Date(Date.now() + 45*60*1000).toISOString() }}&scheduled_at=lte.{{ new Date(Date.now() + 75*60*1000).toISOString() }}"
      }
    },
    {
      "name": "Send Client Reminder",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "toEmail": "={{$json.client_email}}",
        "subject": "⏰ Your call with Nithesh is in 1 hour!",
        "html": "<p>Hi {{$json.client_name}},</p><p>Just a reminder — your discovery call is in <strong>1 hour!</strong></p><p><a href='{{$json.meeting_link}}'>👉 Join Google Meet</a></p><p>See you soon!</p>"
      }
    },
    {
      "name": "Mark Reminder Sent",
      "type": "n8n-nodes-base.supabase",
      "parameters": {
        "operation": "update",
        "tableId": "bookings",
        "id": "={{$json.id}}",
        "fieldsUi": {
          "fieldValues": [
            { "fieldId": "reminder_sent", "fieldValue": true }
          ]
        }
      }
    }
  ]
}
```

---

## WORKFLOW 6: New Blog Post → WhatsApp Broadcast

**Trigger**: Supabase webhook (when blog post published)
**What it does**:
1. Detects new published blog post
2. Formats a nice message
3. Sends to your WhatsApp broadcast list

```json
{
  "name": "06 - Blog Publish → Broadcast",
  "nodes": [
    {
      "name": "Supabase DB Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "blog-published",
        "httpMethod": "POST"
      }
    },
    {
      "name": "Send WhatsApp Broadcast",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "YOUR_WHATSAPP_API",
        "body": {
          "message": "📝 New Article Published!\n\n*{{$json.record.title}}*\n\n{{$json.record.excerpt}}\n\nRead here: YOUR_BLOG_URL/{{$json.record.slug}}"
        }
      }
    }
  ]
}
```

---

## WORKFLOW 7: Weekly Business Summary Report

**Trigger**: Schedule (Every Monday 9 AM)
**What it does**:
1. Queries Supabase for last 7 days of data
2. Compiles: new orders, calls booked, status updates
3. Sends you a formatted WhatsApp summary

```json
{
  "name": "07 - Weekly Summary Report",
  "nodes": [
    {
      "name": "Monday 9AM Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "parameters": {
        "rule": {
          "interval": [{
            "field": "cronExpression",
            "expression": "0 9 * * 1"
          }]
        }
      }
    },
    {
      "name": "Get Weekly Orders",
      "type": "n8n-nodes-base.supabase",
      "parameters": {
        "operation": "getAll",
        "tableId": "orders",
        "filterType": "string",
        "filterString": "created_at=gte.{{ new Date(Date.now() - 7*24*60*60*1000).toISOString() }}"
      }
    },
    {
      "name": "Build Summary",
      "type": "n8n-nodes-base.code",
      "parameters": {
        "jsCode": "const orders = $input.all().map(i => i.json);\nconst total = orders.length;\nconst confirmed = orders.filter(o => ['confirmed','in_progress','delivered'].includes(o.status)).length;\nconst totalValue = orders.reduce((sum, o) => sum + (o.budget_max || 0), 0);\nconst byService = {};\norders.forEach(o => { byService[o.service_name] = (byService[o.service_name] || 0) + 1; });\nconst serviceBreakdown = Object.entries(byService).map(([k,v]) => `${k}: ${v}`).join('\\n');\nreturn [{ json: { total, confirmed, totalValue, serviceBreakdown } }];"
      }
    },
    {
      "name": "Send WhatsApp Summary",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "YOUR_WHATSAPP_API",
        "body": {
          "message": "📊 *Weekly Report — Aethera*\n\n🆕 New Orders: {{$json.total}}\n✅ Confirmed: {{$json.confirmed}}\n💰 Pipeline Value: ₹{{$json.totalValue}}\n\n📋 By Service:\n{{$json.serviceBreakdown}}\n\nHave a great week! 🚀"
        }
      }
    }
  ]
}
```

---

## HOW TO IMPORT THESE INTO n8n

1. Open your n8n instance
2. Click **+ New Workflow**
3. Click the **3-dot menu** → **Import from JSON**
4. Paste the JSON for each workflow
5. Add your credentials:
   - Supabase: URL + Service Role Key
   - OpenAI: API Key
   - Google Calendar: OAuth2
   - WhatsApp: Your API provider (Twilio / WA Business API / Wati)
   - Email: SMTP credentials

## WEBHOOK URLS TO USE IN YOUR WEBSITE

| Workflow | Endpoint |
|----------|----------|
| Order Form Submit | `YOUR_N8N_URL/webhook/new-order` |
| Booking Form Submit | `YOUR_N8N_URL/webhook/book-call` |
| Website Chatbot | `YOUR_N8N_URL/webhook/chat` |
| Blog Publish Hook | `YOUR_N8N_URL/webhook/blog-published` |
