// Cloudflare Pages Functions - Save Proofing Selections
export async function onRequestPatch({ request, env }) {
  try {
    const body = await request.json();
    const { photo_id, is_hearted, retouch_note } = body;

    if (!photo_id) {
      return new Response(JSON.stringify({ ok: false, error: "Photo ID required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (env && env.DB) {
      await env.DB.prepare(
        "UPDATE photos SET is_hearted = COALESCE(?, is_hearted), retouch_note = COALESCE(?, retouch_note) WHERE id = ?"
      ).bind(is_hearted !== undefined ? (is_hearted ? 1 : 0) : null, retouch_note || null, photo_id).run();
    }

    return new Response(JSON.stringify({ ok: true, photo_id, is_hearted }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
