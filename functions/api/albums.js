// Cloudflare Pages Functions - Photography Albums & Proofing API
export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { pin_code } = body;

    if (!pin_code) {
      return new Response(JSON.stringify({ ok: false, error: "4-digit PIN required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (env && env.DB) {
      const album = await env.DB.prepare("SELECT * FROM albums WHERE pin_code = ?").bind(pin_code).first();
      if (!album) {
        return new Response(JSON.stringify({ ok: false, error: "Invalid gallery PIN. Access denied." }), {
          status: 403,
          headers: { "Content-Type": "application/json" }
        });
      }
      const photos = await env.DB.prepare("SELECT * FROM photos WHERE album_id = ?").bind(album.id).all();
      return new Response(JSON.stringify({ ok: true, album, photos: photos.results || [] }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // Default simulation
    if (pin_code === '2026') {
      return new Response(JSON.stringify({
        ok: true,
        album: { id: 'alb_01', title: 'Lake Como Villa Balbiano Wedding', client_name: 'Kabir & Ananya', event_date: 'Sept 14, 2026', total_photos: 184, max_selection_limit: 50 },
        photos: [
          { id: 'ph_01', filename: 'IMG_8812.CR3', image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80', is_hearted: 1 },
          { id: 'ph_02', filename: 'IMG_8819.CR3', image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80', is_hearted: 1 },
          { id: 'ph_03', filename: 'IMG_8840.CR3', image_url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80', is_hearted: 1 }
        ]
      }), { headers: { "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ ok: false, error: "Incorrect PIN. Try 2026 for demo access." }), {
      status: 403,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
