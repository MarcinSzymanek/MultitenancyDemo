import { exec } from 'child_process';
import * as dotenv from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function teardown(_p1: any, _p2: any) {
  console.log('I AM TEARING DOWN');
  dotenv.config({ path: '.env.testing' });
  const container = process.env.CONTAINER_NAME;
  if (!container) {
    console.error('Could not find CONTAINER_NAME env variable');
    return 1;
  }
  exec(
    `docker container stop ${container} && docker container rm ${container} `,
    (error, stdout, stderr) => {
      if (error) {
        console.error(error.message);
        return;
      }
      if (stderr) {
        console.error('stderr: ', stderr);
      }
      console.log('stdout:', stdout);
    },
  );
}

export default teardown;
