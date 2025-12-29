# INE Alumni Monorepo

Full‑stack monorepo containing:
- client (React + Vite)
- server (Spring Boot)
- infra via Docker Compose (Postgres, Redis, backend, frontend)

## Repository Structure

```
.
├─ client/              # React (Vite) app
│  ├─ Dockerfile        # Dev container (Vite dev server)
│  └─ package.json
├─ server/              # Spring Boot app
│  ├─ Dockerfile        # Build & run backend
│  └─ pom.xml
├─ docker-compose.yml   # Orchestrates DBs + backend + frontend
└─ README.md            # This file
```

## Quick Start (Recommended: Docker Compose)

Prerequisites:
- Docker/Podman + Docker Compose plugin

Start all services:
```
docker compose up -d --build
```

URLs:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui/index.html
- Postgres: localhost:5432 (default user/pass/db: hatim/hatim/ine)
- Redis: localhost:6379

Common commands:
```
docker compose logs -f server
docker compose logs -f client
docker compose down
```

Environment (compose defaults):
- Backend:
  - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/ine
  - SPRING_DATASOURCE_USERNAME=hatim
  - SPRING_DATASOURCE_PASSWORD=hatim
  - SPRING_DATA_REDIS_HOST=redis
  - SPRING_DATA_REDIS_PORT=6379
  - APP_JWT_SECRET=local-dev-jwt-secret-key-change-in-production-min-256-bits-required-for-security
  - APP_JWT_EXPIRATION_MS=86400000
- Frontend:
  - VITE_API_URL=http://localhost:8080/api/v1

Update values in docker-compose.yml or export them before running.

## Local Development (without Docker)

Frontend:
```
cd client
npm install
npm run dev
# http://localhost:5173
```


Backend (Postgres local):
- Ensure Postgres is running (see compose defaults)
- Update server/src/main/resources/application.yml or export SPRING_* envs
```
cd server
./mvnw spring-boot:run
```

Run backend tests:
```
cd server
./mvnw clean test
```

## Notes

- Security: authentication is currently disabled for development (anyRequest().permitAll). Re‑enable it before production (JWT filter + method security).
- CORS: adjust allowed origins in server security config for production.
- Swagger should be dev‑only in production environments.

## Contributing

- Frontend lint: `npm run lint` (client)
- Backend format checks: Spotless plugin (runs on build)
- Open PRs against the feature branches as needed.
