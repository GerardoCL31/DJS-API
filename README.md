*Postman:*
https://documenter.getpostman.com/view/49704568/2sBXcAH2ad

## Variables de entorno

Copia `.env.example` a `.env` y cambia los secretos JWT antes de ejecutar la API.

Variables usadas:

- `MONGO_URI`: conexion a MongoDB.
- `JWT_SECRET`: secreto para firmar access tokens.
- `JWT_REFRESH_SECRET`: secreto para firmar refresh tokens.
- `JWT_EXPIRES_IN`: duracion del access token.
- `JWT_REFRESH_EXPIRES_IN`: duracion del refresh token.

## Autenticacion

Rutas disponibles:

- `POST /api/auth/register`: registra usuario. Body: `{ "username": "admin", "password": "password123", "roles": ["admin"] }`.
- `POST /api/auth/login`: inicia sesion. Body: `{ "username": "admin", "password": "password123" }`.
- `POST /api/auth/refresh`: refresca access token. Body: `{ "refreshToken": "..." }`.

Usa el access token en rutas protegidas con:

```txt
Authorization: Bearer <accessToken>
```

Rutas que requieren estar autenticado con cualquier rol:

- `GET /api/bookings`
- `GET /api/bookings/:id`

Rutas que requieren rol `admin`:

- `POST /api/djs`
- `DELETE /api/djs/:id`
