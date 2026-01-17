# Server (Spring Boot)

Spring Boot backend for INE Alumni. Supports Postgres via Docker Compose.
## Prerequisites

- Docker, Docker Compose
- Java 17+ (for local run)

## Setup

Set these env vars before running:

```
APP_JWT_SECRET=your-jwt-secret               (run this to get one ``openssl rand -base64 32``)
SPRING_MAIL_USERNAME=your-email@gmail.com.   (Ask the team for this credential)
SPRING_MAIL_PASSWORD=your-app-password       (Ask the team for this credential)
```

Other variables have defaults in `docker-compose.yml`.

## Run

**Recommended:**
From repository root, run:

```
docker compose up -d --build
```
***Services***:
- Backend API: http://localhost:8080
- Postgres: localhost:5432 (default hatim/hatim/ine)
- Redis: localhost:6379

**Locally:**
```
./mvnw spring-boot:run
```

## Testing

```
./mvnw clean test
```

## API Docs
- Docs: http://localhost:8080/swagger-ui/index.html
