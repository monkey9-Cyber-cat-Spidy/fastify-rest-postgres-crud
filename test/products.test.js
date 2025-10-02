import { test, describe } from 'node:test';
import assert from 'node:assert';
import { buildApp } from '../src/app.js';

describe('Fastify REST PostgreSQL CRUD Tests', () => {
  const app = buildApp({ logger: false });

  test('GET /api/health should return 200 with status', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/health'
    });
    assert.strictEqual(res.statusCode, 200);
    const body = JSON.parse(res.payload);
    assert.strictEqual(body.status, 'healthy');
  });

  test('GET /api/products should return product catalog', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/products'
    });
    assert.strictEqual(res.statusCode, 200);
    const body = JSON.parse(res.payload);
    assert.ok(body.items.length >= 3);
    assert.strictEqual(body.total >= 3, true);
  });

  test('POST /api/products should validate payload schema and insert', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/products',
      payload: {
        sku: 'SEC-WAF-01',
        name: 'Enterprise Web Application Firewall',
        price: 99.50,
        stock: 10,
        category: 'Security'
      }
    });
    assert.strictEqual(res.statusCode, 201);
    const body = JSON.parse(res.payload);
    assert.strictEqual(body.product.sku, 'SEC-WAF-01');
    assert.strictEqual(body.product.price, 99.50);
  });

  test('POST /api/products with invalid schema should return 400 Bad Request', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/products',
      payload: {
        sku: 'A', // too short
        price: -50 // negative price invalid
      }
    });
    assert.strictEqual(res.statusCode, 400);
  });

  test('DELETE /api/products/:id should delete item', async () => {
    const res = await app.inject({
      method: 'DELETE',
      url: '/api/products/prod_1'
    });
    assert.strictEqual(res.statusCode, 200);

    const checkRes = await app.inject({
      method: 'GET',
      url: '/api/products/prod_1'
    });
    assert.strictEqual(checkRes.statusCode, 404);
  });
});
