# Fastify REST PostgreSQL CRUD

High-throughput, production-ready RESTful CRUD microservice built with Fastify v4, PostgreSQL connection pooling, fast JSON schema compilation, and complete automated tests.

## Features

- **Fastify v4 Architecture**: Blazing fast HTTP framework with compiled JSON serialization and strict schema validators.
- **Strict JSON Schema Validation**: Fast fail on invalid inputs before hitting database layers with descriptive error payloads.
- **Clean Architecture Controllers**: Separation of routes, controllers, repository layers, and schema definitions.
- **Full CRUD Endpoints**:
  - `GET /api/products`: List products with pagination and category filtering.
  - `GET /api/products/:id`: Retrieve product by ID.
  - `POST /api/products`: Create product with schema validation.
  - `PUT /api/products/:id`: Partial update product.
  - `DELETE /api/products/:id`: Remove product from repository.
- **Docker Compose Setup**: Bundled multi-container Docker compose with PostgreSQL 16 Alpine.

## Testing & Verification

```bash
npm install
npm test
```
