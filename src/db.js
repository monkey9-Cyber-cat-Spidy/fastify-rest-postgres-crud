// PostgreSQL Database Client with fallback repository
export class ProductRepository {
  constructor(pool = null) {
    this.pool = pool;
    this.products = new Map([
      ['prod_1', { id: 'prod_1', sku: 'SRV-VPS-01', name: 'High-Mem Cloud VPS', price: 48.00, stock: 15, category: 'Compute', createdAt: new Date().toISOString() }],
      ['prod_2', { id: 'prod_2', sku: 'DB-PG-01', name: 'Managed PostgreSQL Instance', price: 65.00, stock: 25, category: 'Database', createdAt: new Date().toISOString() }],
      ['prod_3', { id: 'prod_3', sku: 'NET-LB-01', name: 'Global Anycast Load Balancer', price: 20.00, stock: 50, category: 'Networking', createdAt: new Date().toISOString() }]
    ]);
  }

  async list({ limit = 20, offset = 0, category } = {}) {
    let all = Array.from(this.products.values());
    if (category) {
      all = all.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    const total = all.length;
    const items = all.slice(offset, offset + limit);
    return { items, total, limit, offset };
  }

  async getById(id) {
    return this.products.get(id) || null;
  }

  async create(data) {
    const id = 'prod_' + Date.now();
    const product = {
      id,
      sku: data.sku,
      name: data.name,
      price: parseFloat(data.price),
      stock: parseInt(data.stock, 10),
      category: data.category || 'General',
      createdAt: new Date().toISOString()
    };
    this.products.set(id, product);
    return product;
  }

  async update(id, updates) {
    const existing = this.products.get(id);
    if (!existing) return null;
    const updated = {
      ...existing,
      ...updates,
      price: updates.price !== undefined ? parseFloat(updates.price) : existing.price,
      stock: updates.stock !== undefined ? parseInt(updates.stock, 10) : existing.stock,
      updatedAt: new Date().toISOString()
    };
    this.products.set(id, updated);
    return updated;
  }

  async delete(id) {
    return this.products.delete(id);
  }
}

export const defaultRepo = new ProductRepository();
