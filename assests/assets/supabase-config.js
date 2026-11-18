/*
 * Hoang Quan Photography & Film - Supabase frontend configuration
 * This file runs in the visitor's browser. The Publishable Key is public by design.
 * Never place a Supabase Secret Key or service_role key in this file.
 */
(function () {
  'use strict';

  const SUPABASE_URL = 'https://ykkkjagrmbgmjvrcuvwn.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_YfeXSULEZPe_Ybi1d3w_NA_9AIE1BB7';

  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    window.HQ_SUPABASE_STATUS = 'sdk_unavailable';
    console.error('[Hoang Quan] Supabase SDK did not load. Check the CDN connection.');
    return;
  }

  try {
    window.hqSupabase = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true
        }
      }
    );

    window.HQ_SUPABASE_STATUS = 'ready';
    window.dispatchEvent(new CustomEvent('hq:supabase-ready', {
      detail: { client: window.hqSupabase }
    }));
    console.info('[Hoang Quan] Supabase client initialized.');
  } catch (error) {
    window.HQ_SUPABASE_STATUS = 'initialization_error';
    console.error('[Hoang Quan] Could not initialize Supabase client.', error);
  }
})();
