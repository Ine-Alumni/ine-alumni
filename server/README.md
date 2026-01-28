# Server (Spring Boot)

Spring Boot backend for INE Alumni. Supports Postgres via Docker Compose.

## Run (Docker Compose - recommended)

From repository root:
```
docker compose up -d --build
```

Services:
- Backend API: http://localhost:8080
- Postgres: localhost:5432 (default hatim/hatim/ine)
- Redis: localhost:6379
- Swagger UI: http://localhost:8080/swagger-ui/index.html

Environment (compose defaults):
```
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/ine
SPRING_DATASOURCE_USERNAME=hatim
SPRING_DATASOURCE_PASSWORD=hatim
SPRING_DATA_REDIS_HOST=redis
SPRING_DATA_REDIS_PORT=6379
APP_JWT_SECRET=local-dev-jwt-secret-key-change-in-production-min-256-bits-required-for-security
APP_JWT_EXPIRATION_MS=86400000
```

Postgres local:
- Ensure a Postgres instance is running (see compose defaults)
- Export env vars or update `src/main/resources/application.yml`:
```
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ine
export SPRING_DATASOURCE_USERNAME=hatim
export SPRING_DATASOURCE_PASSWORD=hatim
./mvnw spring-boot:run
```

Tests:
```
./mvnw clean test
```

Build JAR:
```
./mvnw clean package -DskipTests
java -jar target/*.jar
```

Docker image (backend only):
```
docker build -t ine-alumni-backend:local .
docker run --rm -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://host.docker.internal:5432/ine \
  -e SPRING_DATASOURCE_USERNAME=hatim \
  -e SPRING_DATASOURCE_PASSWORD=hatim \
  ine-alumni-backend:local
```

Having issues? See: [TROUBLESHOOTING.md](./server/TROUBLESHOOTING.md)


## Configuration

- `src/main/resources/application.yml` (Postgres by default in container)
- `src/test/resources/application-test.yml` (tests run)

Common properties:
- app.jwtSecret (Base64 or strong secret)
- app.jwtExpirationMs
- spring.data.redis.host/port

## API Docs

- Swagger UI: `/swagger-ui/index.html`
- OpenAPI JSON: `/v3/api-docs`
