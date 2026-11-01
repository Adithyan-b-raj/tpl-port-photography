-- ============================================================
-- ATELIER LUMIERE PHOTOGRAPHY D1 DATABASE SCHEMA
-- ============================================================

CREATE TABLE IF NOT EXISTS albums (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  client_name TEXT NOT NULL,
  pin_code TEXT NOT NULL,
  event_date TEXT NOT NULL,
  total_photos INTEGER DEFAULT 180,
  max_selection_limit INTEGER DEFAULT 50,
  status TEXT DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS photos (
  id TEXT PRIMARY KEY,
  album_id TEXT NOT NULL,
  filename TEXT NOT NULL,
  image_url TEXT NOT NULL,
  aspect_ratio REAL DEFAULT 1.5,
  is_hearted INTEGER DEFAULT 0,
  retouch_note TEXT,
  FOREIGN KEY (album_id) REFERENCES albums(id)
);

CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  wedding_date TEXT,
  venue_city TEXT,
  package_estimate INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_albums_pin ON albums(pin_code);
CREATE INDEX IF NOT EXISTS idx_photos_album ON photos(album_id);
