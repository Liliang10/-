import { onRequestPost as handleBooking } from './functions/api/booking.js';
import { onRequestGet as handleGetUndangan } from './functions/api/get-undangan.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/booking' && request.method === 'POST') {
      try {
        return await handleBooking({ request, env, ctx });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    if (url.pathname === '/api/get-undangan' && request.method === 'GET') {
      try {
        return await handleGetUndangan({ request, env, ctx });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    return ctx.assets.fetch(request);
  },
};