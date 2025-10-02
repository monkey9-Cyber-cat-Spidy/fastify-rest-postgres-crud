import { defaultRepo } from '../db.js';
import { createProductSchema } from '../schemas.js';

export default async function productRoutes(fastify, options) {
  // GET /api/products
  fastify.get('/products', async (request, reply) => {
    const { limit, offset, category } = request.query;
    const result = await defaultRepo.list({
      limit: limit ? parseInt(limit, 10) : 20,
      offset: offset ? parseInt(offset, 10) : 0,
      category
    });
    return result;
  });

  // GET /api/products/:id
  fastify.get('/products/:id', async (request, reply) => {
    const product = await defaultRepo.getById(request.params.id);
    if (!product) {
      return reply.code(404).send({ error: 'Product not found' });
    }
    return { product };
  });

  // POST /api/products
  fastify.post('/products', { schema: createProductSchema }, async (request, reply) => {
    const product = await defaultRepo.create(request.body);
    return reply.code(201).send({
      message: 'Product created successfully',
      product
    });
  });

  // PUT /api/products/:id
  fastify.put('/products/:id', async (request, reply) => {
    const updated = await defaultRepo.update(request.params.id, request.body);
    if (!updated) {
      return reply.code(404).send({ error: 'Product not found' });
    }
    return { message: 'Product updated', product: updated };
  });

  // DELETE /api/products/:id
  fastify.delete('/products/:id', async (request, reply) => {
    const deleted = await defaultRepo.delete(request.params.id);
    if (!deleted) {
      return reply.code(404).send({ error: 'Product not found' });
    }
    return { message: 'Product deleted successfully', id: request.params.id };
  });
}
