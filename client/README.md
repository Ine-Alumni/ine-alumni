# Client (React + Vite)

This is the frontend application for INE Alumni, built with React (Vite).

## Run (Docker Compose - recommended)

From repository root:
```
docker compose up -d --build
```

- Frontend url: http://localhost:5173
- Backend API: http://localhost:8080/api/v1

The `client` service is built from `client/Dockerfile` and runs the Vite dev server.

Environment:
- `VITE_API_URL` (default: `http://localhost:8080/api/v1`)
  - Used by the app to call the backend API
  - Set in `docker-compose.yml` or a local `.env` file

## Run locally (without Docker)

Requirements:
- Node.js 20+
- npm

Commands:
```
npm install
npm run dev          # http://localhost:5173
npm run build        # build to dist/
npm run preview      # preview built app
npm run lint         # eslint
```

Adjust API base URL:
- Create `.env` and set:
  ```
  VITE_API_URL=http://localhost:8080/api/v1
  ```

## Project structure (partial)

```
client/
├─ src/
│  ├─ components/ ... UI components
│  ├─ services/  ... API calls (axios)
│  └─ main.jsx
├─ public/
├─ package.json
├─ vite.config.js
└─ Dockerfile
```

## Notes

- When running via Docker Compose, the backend and supporting services (Postgres, Redis) are started automatically.
- For production, use a multi-stage build (build static assets with Vite, serve with Nginx). The current Dockerfile is dev-oriented (Vite dev server).
