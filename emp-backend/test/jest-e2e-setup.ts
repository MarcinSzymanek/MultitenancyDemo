import { execSync } from 'child_process';
import * as dotenv from 'dotenv';

console.log('Running pre-test setup script...');

dotenv.config({ path: '.env.testing' });

try {
  execSync(
    'docker compose -f local-database/test/testdb-compose.yml up -d && dotenv -e .env.testing "npx prisma migrate dev && npx prisma db seed"',
    {
      stdio: 'inherit',
    },
  );
} catch (err) {
  console.error('Pre-test script failed:', err);
  process.exit(1);
}
