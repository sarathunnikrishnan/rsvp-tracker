import bcrypt from 'bcryptjs';
import { dbPool } from '../config/database.config';
import { getBackendConstants } from '../constants';

/**
 * Initializes database tables and seeds demo accounts with secure bcrypt passwords.
 */
export async function initDatabase(): Promise<void> {
  const constants = getBackendConstants();
  try {
    // 1. Create tables
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        avatar_url VARCHAR(255) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT NOT NULL,
        location VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        event_date DATETIME NOT NULL,
        max_capacity INT UNSIGNED NOT NULL DEFAULT 50,
        created_by INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_events_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_events_category (category),
        INDEX idx_events_date (event_date)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS rsvps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        event_id INT NOT NULL,
        user_id INT NOT NULL,
        status ENUM('going', 'maybe', 'declined') NOT NULL DEFAULT 'going',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_rsvps_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
        CONSTRAINT fk_rsvps_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT unique_event_user UNIQUE (event_id, user_id),
        INDEX idx_rsvps_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 2. Check if users are seeded
    const [rows]: any = await dbPool.query('SELECT COUNT(*) as count FROM users');
    if (rows[0].count === 0) {
      console.log('🌱 Seeding database demo users and sample events...');
      const defaultPasswordHash = await bcrypt.hash(constants.AUTH.DEFAULT_PASSWORD, 10);

      await dbPool.query(
        `INSERT INTO users (id, name, email, password_hash, avatar_url) VALUES
        (1, 'Sarah Connor', 'sarah@dexqbit.com', ?, 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'),
        (2, 'Alex Dev', 'alex@dexqbit.com', ?, 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'),
        (3, 'Elena Rostova', 'elena@dexqbit.com', ?, 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena')`,
        [defaultPasswordHash, defaultPasswordHash, defaultPasswordHash]
      );

      await dbPool.query(`
        INSERT INTO events
          (id, title, description, location, category, event_date, max_capacity, created_by)
        VALUES
          (1, 'AI & Next.js Architecture Meetup',
           'Join tech leaders at Dexqbit to discuss Next.js 14, microservices, and AI integrations.',
           'Dexqbit HQ, Tech Park Suite 404', 'Tech', DATE_ADD(NOW(), INTERVAL 5 DAY), 30, 1),
          (2, 'ERPNext & Open Source ERP Workshop',
           'Deep dive into ERPNext customization, Frappe framework hooks, and enterprise workflows.',
           'Innovation Hub Room A', 'Workshop', DATE_ADD(NOW(), INTERVAL 12 DAY), 20, 2),
          (3, 'Mobile Dev & Flutter Coffee Networking',
           'Casual morning coffee networking for iOS & Android developers. Share project ideas.',
           'Brew & Bytes Cafe, Downtown', 'Networking', DATE_ADD(NOW(), INTERVAL 3 DAY), 15, 3)
      `);

      await dbPool.query(
        `INSERT INTO rsvps (event_id, user_id, status) VALUES
        (1, 1, ?),
        (1, 2, ?),
        (1, 3, ?),
        (2, 2, ?),
        (2, 1, ?),
        (3, 3, ?)`,
        [
          constants.RSVP_STATUS.GOING,
          constants.RSVP_STATUS.GOING,
          constants.RSVP_STATUS.MAYBE,
          constants.RSVP_STATUS.GOING,
          constants.RSVP_STATUS.DECLINED,
          constants.RSVP_STATUS.GOING,
        ]
      );
      console.log('✅ Database successfully seeded!');
    }
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
}
