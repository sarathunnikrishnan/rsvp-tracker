import { createApp } from './app';
import { envConfig } from './config/env.config';
import { initDatabase } from './db/init-db';

/**
 * Server entrypoint: boots database schema/seeds then starts HTTP listener.
 */
async function startServer(): Promise<void> {
  try {
    console.log('🔄 Connecting to MySQL and initializing schema...');
    await initDatabase();
    console.log('✅ MySQL schema & seeds ready.');

    const app = createApp();
    app.listen(envConfig.port, () => {
      console.log('\n==================================================');
      console.log('  ✅ DEXQBIT BACKEND SERVER RUNNING SUCCESSFULLY!  ');
      console.log(`  🌐 URL: http://localhost:${envConfig.port}/api`);
      console.log(`  ⚙️  Environment: ${envConfig.nodeEnv}`);
      console.log('==================================================\n');
    });
  } catch (error) {
    console.error('💥 Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
