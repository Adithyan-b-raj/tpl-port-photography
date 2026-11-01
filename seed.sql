-- ============================================================
-- ATELIER LUMIERE PHOTOGRAPHY SEED DATA
-- ============================================================

INSERT OR IGNORE INTO albums (id, title, client_name, pin_code, event_date, total_photos, max_selection_limit) VALUES
  ('alb_01', 'Lake Como Villa Balbiano Wedding', 'Kabir & Ananya', '2026', 'Sept 14, 2026', 184, 50),
  ('alb_02', 'Vogue India Fall Haute Couture', 'Editorial Feature', '4488', 'Oct 02, 2026', 92, 25);

INSERT OR IGNORE INTO photos (id, album_id, filename, image_url, is_hearted, retouch_note) VALUES
  ('ph_01', 'alb_01', 'IMG_8812.CR3', 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80', 1, 'Enhance evening rim lighting on veil'),
  ('ph_02', 'alb_01', 'IMG_8819.CR3', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80', 1, 'Album Cover contender'),
  ('ph_03', 'alb_01', 'IMG_8840.CR3', 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80', 1, 'Clean up background guest in reflection');
