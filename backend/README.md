# Watch World by Azdadkhan API

Express + MongoDB backend for the Watch World by Azdadkhan storefront and admin dashboard.

## Setup

```bash
cd backend
npm install
cp .env.example .env
# Start MongoDB locally, then:
npm run seed
npm run dev
```

API runs at `http://localhost:5000`.

## Default admin

- Email: `Azdadkhan5@gmail.com`
- Password: `Admin@123`
- Phone: `0328 8819985`

## Endpoints

### Auth
| Method | Path | Access |
|--------|------|--------|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Auth |
| PUT | `/api/auth/me` | Auth |

### Products
| Method | Path | Access |
|--------|------|--------|
| GET | `/api/products` | Public |
| GET | `/api/products/:id` | Public |
| POST | `/api/products` | Admin |
| PUT | `/api/products/:id` | Admin |
| DELETE | `/api/products/:id` | Admin |

Query params: `brand`, `q`, `minPrice`, `maxPrice`, `onSale`, `inStock`, `sort`

### Users
| Method | Path | Access |
|--------|------|--------|
| GET | `/api/users` | Admin |
| POST | `/api/users` | Admin |
| PUT | `/api/users/:id` | Admin |
| PATCH | `/api/users/:id/role` | Admin |
| PATCH | `/api/users/:id/status` | Admin |
| DELETE | `/api/users/:id` | Admin |

### Orders
| Method | Path | Access |
|--------|------|--------|
| GET | `/api/orders` | Admin |
| POST | `/api/orders` | Admin |
| PUT | `/api/orders/:id` | Admin |
| PATCH | `/api/orders/:id/status` | Admin |
| DELETE | `/api/orders/:id` | Admin |

Auth header: `Authorization: Bearer <token>`
