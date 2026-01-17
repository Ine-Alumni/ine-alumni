# Contributing Guide

Thanks for your interest in contributing to INE Alumni! This document explains how to set up the project, coding standards, workflows, and how to open pull requests.

## Monorepo Overview

This repository hosts both frontend and backend:

- `client/` — React (Vite)
- `server/` — Spring Boot
- `docker-compose.yml` — Orchestrates Postgres, Redis, backend, and frontend for local development

## Prerequisites

- Git
- Docker/Podman with Docker Compose plugin (recommended dev workflow)
- Node.js 20+ and npm (for local client dev without Docker)
- Java 17+ & Maven wrapper (for local server dev without Docker)

## Getting Started

### Option A: Run Everything with Docker Compose (Recommended)

From repository root:
```
docker compose up -d --build
```

See full setup: [DOCKER_SETUP.md](./DOCKER_SETUP.md)


Services & URLs:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui/index.html
- Postgres: localhost:5432 (default user/pass/db: `hatim`/`hatim`/`ine`)
- Redis: localhost:6379

Useful commands:
```
docker compose logs -f server
docker compose logs -f client
docker compose down
```

### Option B: Run Locally (without Docker)

Frontend:
```
cd client
npm install
npm run dev      # http://localhost:5173
```
- API base URL (default): `VITE_API_URL=http://localhost:8080/api/v1`
- Set via `.env` in `client/` if needed.

Backend (Postgres local):
```
cd server
# Make sure Postgres is running and credentials match server/src/main/resources/application.yml
./mvnw spring-boot:run
```
Tests:
```
cd server
./mvnw clean test
```

## Branching & Workflow

- Create feature branches from the main integration branch:
  - `feat/<short-description>`
  - `fix/<short-description>`
  - `chore/<short-description>`
- Keep PRs small and focused. One PR per concern is preferred.
- Always include a clear description, motivation, and testing notes.

### Commit Messages

Prefer Conventional Commits:
- `feat: add companies search filters`
- `fix: handle null user role in JWT filter`
- `chore: update docker-compose defaults`
- `docs: update server README`

## Coding Standards

### Frontend (client)
- Lint: `npm run lint` (ESLint)
- Code style: follow existing patterns (functional components, hooks)
- Env config: use `VITE_*` variables (e.g., `VITE_API_URL`)

### Backend (server)
- Java 17, Spring Boot 3
- Build & checks: Maven wrapper (`./mvnw`)
- Formatting: Spotless plugin runs on build (do not disable)
- Do not commit secrets. Use environment variables or `.env-template` as a reference.

## Security Notes

- Development mode may have authentication disabled to speed up integration (`permitAll`). Ensure you re-enable JWT authentication and method-level security before production.
- CORS: restrict allowed origins appropriately before production.
- Swagger should not be publicly accessible in production environments.
- Never commit secrets. Use environment variables or secrets managers.

## Environment Variables

Compose defaults (adjust in `docker-compose.yml` or export locally):

Backend:
- `SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/ine`
- `SPRING_DATASOURCE_USERNAME=hatim`
- `SPRING_DATASOURCE_PASSWORD=hatim`
- `SPRING_DATA_REDIS_HOST=redis`
- `SPRING_DATA_REDIS_PORT=6379`
- `APP_JWT_SECRET=local-dev-jwt-secret-key-change-in-production-min-256-bits-required-for-security`
- `APP_JWT_EXPIRATION_MS=86400000`

Frontend:
- `VITE_API_URL=http://localhost:8080/api/v1`

## Pull Request Checklist

- [ ] The branch name and commits follow the guidelines.
- [ ] The change builds and runs locally (Docker Compose or local dev).
- [ ] Lint passes in `client/` and build/tests pass in `server/`.
- [ ] Documentation updated if needed (README, environment docs).
- [ ] No secrets or sensitive data committed.

## Project Structure (Summary)

```
.
├─ client/                # React + Vite frontend
│  ├─ src/                # Components, services, pages
│  ├─ Dockerfile          # Dev container (Vite dev server)
│  └─ package.json
├─ server/                # Spring Boot backend
│  ├─ src/main            # Java code and application.yml
│  ├─ src/test            # Tests
│  └─ Dockerfile
├─ docker-compose.yml     # Full stack local orchestration
└─ README.md              # Root documentation
```

## Reporting Issues

- Use GitHub Issues to report bugs or request features.
- Include steps to reproduce and any relevant logs or screenshots.

## Contact

Open an issue or tag maintainers in PRs if you need review or direction. Thanks for contributing!
