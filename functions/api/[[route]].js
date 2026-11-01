export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.pathname === '/api/leads' && context.request.method === 'GET') {
    return new Response(JSON.stringify([{"id":"ALB-2026","name":"Meera & Aditya (Kumarakom Wedding)","phone":"919847011223","detail":"PIN: 2026 • Selected 85/400 Photos for Italian Album • 2 Days Luxury Crew","status":"PROOFING COMPLETE","amount":"₹1,95,000"},{"id":"INQ-702","name":"Dr. Sneha & Gautam (Dec 18–19 Guruvayur + Kochi)","phone":"919447033445","detail":"2 Days Photo + 4K Cinema + Drone • Requested Date Hold","status":"DATE AVAILABLE","amount":"₹1,60,000"},{"id":"INQ-703","name":"Kaka by Eliza — Festive Lookbook Shoot","phone":"919061902295","detail":"1 Day Commercial Editorial + 30 Retouched E-Com Frames","status":"ADVANCE PAID","amount":"₹45,000"}]), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30, s-maxage=60, stale-while-revalidate=120'
      }
    });
  }
  if (url.pathname === '/api/leads' && context.request.method === 'POST') {
    const body = await context.request.json().catch(() => ({}));
    return new Response(JSON.stringify({ ok: true, id: body.id || 'REQ-LIVE' }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  }
  return new Response(JSON.stringify({ service: 'tpl-port-photography', status: 'ok' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
