import { buildApp } from './app.js';

const app = buildApp({
  logger: true
});

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

try {
  await app.listen({ port: PORT, host: HOST });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
