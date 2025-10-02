import Fastify from 'fastify';
import productRoutes from './routes/products.js';

export function buildApp(opts = {}) {
  const app = Fastify(opts);

  app.get('/api/health', async () => {
    return {
      status: 'healthy',
      framework: 'Fastify v4',
      timestamp: new Date().toISOString()
    };
  });

  app.register(productRoutes, { prefix: '/api' });

  return app;
}
