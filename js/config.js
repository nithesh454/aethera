// ============================================================
// AETHERA — Configuration
// ============================================================

const CONFIG = {
  // Supabase
  SUPABASE_URL: 'https://cucxkjvxyyqymftrwklc.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1Y3hranZ4eXlxeW1mdHJ3a2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NTEyMTcsImV4cCI6MjA5MDQyNzIxN30.LVvk1d3ZzEAFo-aJaBFloBV-rGwra-ANYA8LHs6Nfvo',

  // Brand
  BRAND_NAME: 'Aethera',
  FOUNDER: 'Nithesh Devarla',
  YEAR: new Date().getFullYear(),
};

// Initialize global Supabase client if the script is loaded
if (typeof supabase !== 'undefined') {
  window.supabaseClient = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
} else {
  console.warn("Supabase SDK not loaded yet.");
}
