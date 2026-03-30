-- ============================================================
-- AUTOSTACK / NITHAI — COMPLETE SUPABASE SCHEMA
-- Copy-paste this entire file into Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ============================================================
-- 1. SERVICES TABLE
-- What you offer — shown on Services/Order page
-- ============================================================
CREATE TABLE services (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  category        TEXT NOT NULL, -- 'chatbot' | 'rag' | 'automation' | 'dashboard' | 'fullstack' | 'custom'
  short_desc      TEXT,
  full_desc       TEXT,
  price_from      NUMERIC(10,2),
  price_to        NUMERIC(10,2), -- NULL means fixed price
  delivery_days   INT,           -- estimated delivery in days
  features        TEXT[],        -- list of features shown on card
  icon_name       TEXT,          -- icon identifier for frontend
  is_active       BOOLEAN DEFAULT TRUE,
  is_featured     BOOLEAN DEFAULT FALSE,
  sort_order      INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default services
INSERT INTO services (name, category, short_desc, price_from, delivery_days, features, is_active) VALUES
('AI Chatbot for Business',   'chatbot',    'Smart chatbot that answers customer queries 24/7',  4999,  7,  ARRAY['Custom trained on your data','WhatsApp/Web integration','Handoff to human','Analytics dashboard'], TRUE),
('RAG Knowledge System',      'rag',        'AI that searches your documents and gives answers',  9999, 14, ARRAY['Upload PDFs/Docs/Excel','Hybrid search (BM25 + Semantic)','API access','Supabase/Qdrant backend'], TRUE),
('n8n Automation Workflow',   'automation', 'Automate repetitive tasks with smart workflows',     6999, 10, ARRAY['Custom workflow design','Webhook triggers','Email/WhatsApp alerts','Error handling'], TRUE),
('Analytics Dashboard',       'dashboard',  'Beautiful dashboard to track your business data',   7999, 12, ARRAY['Real-time data','Custom KPIs','Mobile responsive','Export reports'], TRUE),
('Full Website + AI Backend', 'fullstack',  'Complete website with AI features and n8n backend', 19999,30, ARRAY['Landing page','Booking system','AI chatbot','n8n backend','Supabase DB'], TRUE),
('Custom AI Project',         'custom',     'Have a unique idea? Lets build it together',         NULL, NULL, ARRAY['Free consultation','Custom scoping','Flexible pricing','Full support'], TRUE);


-- ============================================================
-- 2. ORDERS TABLE
-- Every service request / lead captured from website
-- ============================================================
CREATE TABLE orders (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number        TEXT UNIQUE, -- e.g. ORD-2024-001
  
  -- Client Info
  client_name         TEXT NOT NULL,
  client_email        TEXT NOT NULL,
  client_phone        TEXT,
  client_whatsapp     TEXT,
  
  -- Business Context (from intake form)
  business_name       TEXT,
  business_type       TEXT, -- 'ecommerce' | 'restaurant' | 'healthcare' | 'education' | 'other'
  business_size       TEXT, -- 'solo' | 'small' (2-10) | 'medium' (11-50) | 'large' (50+)
  
  -- Problem Details
  problem_type        TEXT, -- 'chatbot' | 'automation' | 'data_system' | 'full_backend' | 'other'
  problem_description TEXT,
  current_tools       TEXT, -- what tools they currently use
  expected_outcome    TEXT,
  
  -- Service & Pricing
  service_id          UUID REFERENCES services(id),
  service_name        TEXT, -- snapshot at time of order
  budget_min          NUMERIC(10,2),
  budget_max          NUMERIC(10,2),
  quoted_price        NUMERIC(10,2),
  final_price         NUMERIC(10,2),
  
  -- Order Status
  status              TEXT DEFAULT 'new',
  -- 'new' → 'contacted' → 'scoping' → 'quoted' → 'confirmed' → 'in_progress' → 'review' → 'delivered' → 'closed'
  priority            TEXT DEFAULT 'normal', -- 'low' | 'normal' | 'high' | 'urgent'
  
  -- Internal Notes
  internal_notes      TEXT,
  rejection_reason    TEXT,
  
  -- Source tracking
  source              TEXT DEFAULT 'website', -- 'website' | 'referral' | 'whatsapp' | 'direct'
  utm_source          TEXT,
  utm_medium          TEXT,
  
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'ORD-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('order_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE IF NOT EXISTS order_seq START 1;
CREATE TRIGGER set_order_number BEFORE INSERT ON orders FOR EACH ROW EXECUTE FUNCTION generate_order_number();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- 3. BOOKINGS TABLE
-- Calls and meetings booked by clients
-- ============================================================
CREATE TABLE bookings (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id        UUID REFERENCES orders(id),
  
  -- Client (denormalized for quick access)
  client_name     TEXT NOT NULL,
  client_email    TEXT NOT NULL,
  client_phone    TEXT,
  
  -- Meeting Details
  booking_type    TEXT DEFAULT 'discovery', -- 'discovery' | 'scoping' | 'demo' | 'review' | 'support'
  scheduled_at    TIMESTAMPTZ NOT NULL,
  duration_mins   INT DEFAULT 30,
  timezone        TEXT DEFAULT 'Asia/Kolkata',
  
  -- Meeting Link
  platform        TEXT, -- 'google_meet' | 'zoom' | 'whatsapp_call' | 'phone'
  meeting_link    TEXT,
  phone_number    TEXT,
  
  -- Status
  status          TEXT DEFAULT 'scheduled', -- 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
  reminder_sent   BOOLEAN DEFAULT FALSE,
  
  -- Notes
  agenda          TEXT,
  meeting_notes   TEXT,
  action_items    TEXT[],
  
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- 4. PROJECTS TABLE
-- Portfolio projects shown on Projects page
-- ============================================================
CREATE TABLE projects (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  category        TEXT, -- 'rag' | 'automation' | 'dashboard' | 'fullstack'
  short_desc      TEXT,
  full_desc       TEXT,
  
  -- Media
  thumbnail_url   TEXT,
  screenshot_urls TEXT[],
  demo_video_url  TEXT,
  
  -- Links
  project_url     TEXT,
  github_url      TEXT,
  case_study_url  TEXT,
  
  -- Tech Stack
  tech_tags       TEXT[], -- ['n8n', 'Qdrant', 'RAG', 'Supabase']
  
  -- Display
  is_featured     BOOLEAN DEFAULT FALSE,
  is_published    BOOLEAN DEFAULT TRUE,
  sort_order      INT DEFAULT 0,
  
  -- Stats (for social proof)
  result_metric   TEXT, -- e.g. "Reduced support tickets by 60%"
  
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Seed your existing projects
INSERT INTO projects (title, slug, category, short_desc, tech_tags, is_featured, is_published) VALUES
('RAG Hybrid Search', 'rag-hybrid-search', 'rag', 'Hybrid search using Qdrant with BM25 + Semantic + Query Decomposition', ARRAY['n8n','Qdrant','RAG','Python'], FALSE, TRUE),
('Excel & Table RAG Pipeline', 'excel-rag-pipeline', 'rag', 'Tabular data vectorization and hybrid indexing for Excel/CSV files', ARRAY['n8n','Qdrant','RAG','Supabase'], FALSE, TRUE),
('Document RAG Pipeline', 'document-rag-pipeline', 'rag', 'Document ingestion and vectorization system with hybrid search', ARRAY['n8n','Qdrant','RAG'], FALSE, TRUE),
('KLI Analytics Backend', 'kli-analytics', 'fullstack', 'Complete n8n AI backend for KLI Brands live application', ARRAY['n8n','Supabase','AI','Dashboard'], TRUE, TRUE);


-- ============================================================
-- 5. BLOG POSTS TABLE
-- Content marketing / SEO
-- ============================================================
CREATE TABLE blog_posts (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  excerpt         TEXT,
  content         TEXT, -- markdown content
  cover_image_url TEXT,
  tags            TEXT[],
  category        TEXT, -- 'rag' | 'automation' | 'tutorial' | 'case-study'
  read_time_mins  INT,
  is_published    BOOLEAN DEFAULT FALSE,
  published_at    TIMESTAMPTZ,
  views           INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 6. TESTIMONIALS TABLE
-- Social proof shown on landing page
-- ============================================================
CREATE TABLE testimonials (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name     TEXT NOT NULL,
  client_title    TEXT, -- 'Owner, ABC Bakery'
  client_photo    TEXT,
  content         TEXT NOT NULL,
  rating          INT CHECK (rating BETWEEN 1 AND 5),
  project_id      UUID REFERENCES projects(id),
  is_featured     BOOLEAN DEFAULT FALSE,
  is_published    BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 7. CONTACT MESSAGES TABLE
-- Quick contact form messages (not full orders)
-- ============================================================
CREATE TABLE contact_messages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  subject     TEXT,
  message     TEXT NOT NULL,
  source_page TEXT, -- which page they sent from
  is_read     BOOLEAN DEFAULT FALSE,
  replied_at  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 8. PRICING PACKAGES TABLE
-- For the pricing page tiers
-- ============================================================
CREATE TABLE pricing_packages (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL, -- 'Starter' | 'Growth' | 'Enterprise'
  tagline         TEXT,
  price           NUMERIC(10,2), -- NULL = custom
  price_label     TEXT, -- '₹4,999' or 'Custom'
  billing_type    TEXT DEFAULT 'one_time', -- 'one_time' | 'monthly'
  features        TEXT[],
  cta_label       TEXT DEFAULT 'Get Started',
  is_popular      BOOLEAN DEFAULT FALSE,
  is_active       BOOLEAN DEFAULT TRUE,
  sort_order      INT DEFAULT 0
);

INSERT INTO pricing_packages (name, tagline, price, features, is_popular, sort_order) VALUES
('Starter', 'Perfect for first-time AI adopters', 4999, ARRAY['1 AI Chatbot','Basic n8n Workflow','WhatsApp Integration','1 Month Support','Documentation'], FALSE, 1),
('Growth', 'For businesses ready to scale', 14999, ARRAY['AI Chatbot + RAG System','3 n8n Workflows','WhatsApp + Web Integration','Analytics Dashboard','3 Months Support','Priority Response'], TRUE, 2),
('Enterprise', 'Full AI transformation', NULL, ARRAY['Everything in Growth','Full AI Backend','Custom Integrations','Dedicated Support','Monthly Strategy Calls','Source Code Included'], FALSE, 3);


-- ============================================================
-- 9. ROW LEVEL SECURITY (RLS)
-- Only you can read orders/bookings from backend
-- ============================================================
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public can INSERT (submit forms)
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Anyone can create bookings" ON bookings FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Anyone can create messages" ON contact_messages FOR INSERT WITH CHECK (TRUE);

-- Only authenticated (you) can SELECT/UPDATE
CREATE POLICY "Auth users read orders" ON orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users update orders" ON orders FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users read bookings" ON bookings FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users read messages" ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');

-- Public can read services, projects, blog, testimonials, pricing
CREATE POLICY "Public read services" ON services FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public read blog" ON blog_posts FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public read pricing" ON pricing_packages FOR SELECT USING (is_active = TRUE);

-- Enable RLS on public tables too
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_packages ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- 10. USEFUL VIEWS
-- ============================================================

-- Dashboard summary view
CREATE VIEW order_summary AS
SELECT 
  status,
  COUNT(*) as count,
  SUM(quoted_price) as total_quoted,
  SUM(final_price) as total_confirmed
FROM orders
GROUP BY status;

-- Recent leads view
CREATE VIEW recent_leads AS
SELECT 
  o.order_number,
  o.client_name,
  o.client_email,
  o.client_phone,
  o.business_type,
  o.problem_type,
  o.service_name,
  o.budget_max,
  o.status,
  o.created_at,
  b.scheduled_at as call_scheduled
FROM orders o
LEFT JOIN bookings b ON b.order_id = o.id
ORDER BY o.created_at DESC;
