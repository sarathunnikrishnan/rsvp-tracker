-- Seed data for Local Meetup RSVP Tracker

-- Demo Users (Passwords will be hashed as 'Password123!')
INSERT IGNORE INTO users (id, name, email, password_hash, avatar_url) VALUES
(
  1,
  'Sarah Connor',
  'sarah@dexqbit.com',
  '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
),
(
  2,
  'Alex Dev',
  'alex@dexqbit.com',
  '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
),
(
  3,
  'Elena Rostova',
  'elena@dexqbit.com',
  '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena'
);

-- Sample Meetup Events
INSERT IGNORE INTO events (
  id, title, description, location, category, event_date, max_capacity, created_by
) VALUES
(
  1,
  'AI & Next.js Architecture Meetup',
  'Join tech leaders at Dexqbit to discuss full-stack Next.js 14, microservices, and AI integrations.',
  'Dexqbit HQ, Tech Park Suite 404',
  'Tech',
  DATE_ADD(NOW(), INTERVAL 5 DAY),
  30,
  1
),
(
  2,
  'ERPNext & Open Source ERP Workshop',
  'Deep dive into ERPNext customization, Frappe framework hooks, and enterprise workflow design.',
  'Innovation Hub Room A',
  'Workshop',
  DATE_ADD(NOW(), INTERVAL 12 DAY),
  20,
  2
),
(
  3,
  'Mobile App Dev & Flutter Coffee Networking',
  'Casual morning coffee networking for iOS & Android developers. Share project ideas and best practices.',
  'Brew & Bytes Cafe, Downtown',
  'Networking',
  DATE_ADD(NOW(), INTERVAL 3 DAY),
  15,
  3
);

-- Sample RSVPs
INSERT IGNORE INTO rsvps (event_id, user_id, status) VALUES
(1, 1, 'going'),
(1, 2, 'going'),
(1, 3, 'maybe'),
(2, 2, 'going'),
(2, 1, 'declined'),
(3, 3, 'going');
