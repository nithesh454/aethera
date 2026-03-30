# 🔑 How to Connect Supabase to Your Code
## Step-by-step — No subscription needed, Free plan works!

---

## STEP 1 — Get Your Supabase Credentials

1. Go to https://supabase.com → Your Project
2. Click **Settings** (gear icon, left sidebar)
3. Click **API**
4. Copy these two values:

```
Project URL:  https://xxxxxxxxxxxx.supabase.co
Anon Key:     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx...
```

⚠️ Use the **anon/public** key (NOT the service_role key) in frontend code.

---

## STEP 2 — Add to Your Code

### If using Vanilla JS / HTML (Antigravity default):
Add this in your HTML `<head>`:

```html
<!-- Supabase SDK -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script>
  // Initialize Supabase — put your actual values here
  const { createClient } = supabase
  const db = createClient(
    'https://YOUR_PROJECT_ID.supabase.co',
    'YOUR_ANON_KEY_HERE'
  )
</script>
```

Then use `db` anywhere in your JS:
```javascript
// Example: fetch services
const { data, error } = await db
  .from('services')
  .select('*')
  .eq('is_active', true)
```

---

### If using React / Next.js:
```bash
npm install @supabase/supabase-js
```

Create file `lib/supabase.js`:
```javascript
import { createClient } from '@supabase/supabase-js'

const db = createClient(
  'https://YOUR_PROJECT_ID.supabase.co',
  'YOUR_ANON_KEY_HERE'
)

export default db
```

Import and use anywhere:
```javascript
import db from '@/lib/supabase'

const { data } = await db.from('services').select('*')
```

---

## STEP 3 — Connect n8n to Supabase

1. In n8n, open any workflow with a Supabase node
2. Click the Supabase node → **Credentials** → **Create New**
3. Fill in:
   - **Host**: `YOUR_PROJECT_ID.supabase.co`
   - **Service Role Secret**: get from Supabase → Settings → API → `service_role` key
   
⚠️ n8n uses **service_role** key (not anon key) because n8n runs on server side.

---

## STEP 4 — Add Blog View Counter Function

Run this once in Supabase SQL Editor:
```sql
CREATE OR REPLACE FUNCTION increment_blog_views(post_id UUID)
RETURNS void AS $$
  UPDATE blog_posts SET views = views + 1 WHERE id = post_id;
$$ LANGUAGE sql SECURITY DEFINER;
```

---

## STEP 5 — Test Your Connection

Paste this in browser console after setup:
```javascript
const { data, error } = await db.from('services').select('*')
console.log('Services:', data)
console.log('Error:', error)
```

If you see your services — connection is working! ✅

---

## CREDENTIALS SUMMARY

| Where | Which Key | Why |
|-------|-----------|-----|
| Frontend JS code | `anon` key | Safe to expose in browser |
| n8n Supabase node | `service_role` key | Server-side, bypasses RLS |
| Never expose | `service_role` in frontend | Security risk! |

---

## YOUR WEBHOOK URLS (fill these in supabase-client.js)

After importing workflows to n8n, your webhook URLs will be:

```javascript
const N8N_ORDER_ALERT   = 'https://YOUR_N8N_URL/webhook/order-alert'
const N8N_BOOKING_ALERT = 'https://YOUR_N8N_URL/webhook/booking-alert'
const N8N_CHAT          = 'https://YOUR_N8N_URL/webhook/chat'
```

To find your n8n URL:
- Self-hosted: your server URL + `/webhook/`
- n8n Cloud: shown in the webhook node after activating workflow