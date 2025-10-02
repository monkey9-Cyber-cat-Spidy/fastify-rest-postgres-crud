export const productSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    sku: { type: 'string' },
    name: { type: 'string' },
    price: { type: 'number' },
    stock: { type: 'integer' },
    category: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' }
  }
};

export const createProductSchema = {
  body: {
    type: 'object',
    required: ['sku', 'name', 'price', 'stock'],
    properties: {
      sku: { type: 'string', minLength: 3 },
      name: { type: 'string', minLength: 2 },
      price: { type: 'number', minimum: 0 },
      stock: { type: 'integer', minimum: 0 },
      category: { type: 'string' }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        product: productSchema
      }
    }
  }
};
