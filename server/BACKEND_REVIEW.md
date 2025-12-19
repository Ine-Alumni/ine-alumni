INE Alumni Backend – Technical Review and Recommendations

Overview
- Stack: Spring Boot 3.4.5 (Java 17), Spring MVC, Spring Security (JWT), Spring Data JPA (PostgreSQL), Spring Mail, Spring Data Redis (OTP), Springdoc OpenAPI, Spotless for formatting.
- Structure:
  - Controllers: Auth, Password Reset, Email Verification, Events (public + admin), Offers (CRUD, filter, apply), Alumni/Laureats (browse/filter), Companies (browse/details/reviews), Resources (CRUD with permissions), Profile (self/admin), Files (upload).
  - Services: Clear separation of concerns; DTO mapping inside service classes (CompanyService, LaureatService, OfferServiceImpl, ProfileServiceImpl).
  - Repositories: Rich query methods with custom JPQL for reporting/filtering.
  - Security: Stateless JWT with custom AuthorizationManager gating based on email verification; BCrypt password hashing.
  - Exceptions: GlobalExceptionHandler returns a consistent ApiResponseDto shape for errors.
  - Runtime: app.yml uses env variables; Flyway present but disabled; JPA ddl-auto: validate.
  - Dev bootstrap: DataInitializerService CommandLineRunner populates fixtures if DB is empty.
  - Docker: docker-compose for Postgres, pgAdmin, Redis.
  - Dev profile: H2 in-memory DB added for local development (application-dev.yml). H2 console at /h2-console.
    - Activate with SPRING_PROFILES_ACTIVE=dev or: mvn spring-boot:run -Dspring-boot.run.profiles=dev
    - In dev: JPA ddl-auto=update, Flyway disabled, DataInitializerService runs (seed), JWT dev secret is a placeholder (align with JwtUtils Base64/plaintext choice)

API surface summary
- Auth: POST /api/v1/auth/signup, POST /api/v1/auth/signin, GET /api/v1/auth/validate
- Password reset: POST /api/v1/password/forgot, POST /api/v1/password/reset
- Email verification: GET /api/v1/email/resend-verification, GET /api/v1/email/verify
- Events: GET /api/v1/events/public, GET /api/v1/events/public/{id} (public). POST/PUT/DELETE /api/v1/events/{id} (secured by events:* permissions)
- Offers: CRUD + filters: GET /api/v1/offers, GET /api/v1/offers/{id}, POST /api/v1/offers, PUT/DELETE /api/v1/offers/{id}, GET by company/location/type, POST apply, GET appliers
- Alumni/Laureats: GET /api/v1/laureats (+ /search, /filter via DTO, filter-options majors/domains/year)
- Companies: GET /api/v1/companies (+ /search, /{id}, /{id}/alumni, /{id}/reviews)
- Resources: CRUD with granular permissions and category/domain search
- Profiles: GET /me, GET/DELETE /{userId} (admin/super-admin controls), update endpoints
- Files: POST /api/v1/files/upload (stores on disk under ./uploads, served at /uploads/**)

What’s solid
- Clean layered architecture (controllers -> services -> repos + DTOs).
- Stateless JWT auth (OncePerRequestFilter) and BCrypt password hashing.
- Authorization model uses Role and Permission enums with method-level and URL-gated access.
- Consistent error envelope via GlobalExceptionHandler and AuthEntryPointJwt.
- Springdoc for OpenAPI UI.
- Good DTO separation for request/response.
- Spotless integrated in Maven build to enforce formatting.

Issues and risks
1) Dependency versions drift and management
- Mail starter is pinned to 3.0.1 while parent is 3.4.5. This can cause classpath conflicts. Let the Spring Boot parent manage all spring-boot-starter-* versions.
- Security starter explicitly set to 3.4.5 is redundant; also let parent manage.
- Flyway is added but disabled; either use it properly or remove to reduce surface area.

Action:
- Remove version from spring-boot-starter-mail and spring-boot-starter-security in pom.xml to inherit from the parent.
- If Flyway won’t be used, remove flyway dependencies; otherwise enable and add migrations.

2) JWT secret handling mismatch
- JwtUtils expects a Base64-encoded secret (Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret))) but .env-template suggests a plain string “your-real-jwt-secret”. That will fail at runtime unless the env var is Base64.

Action (pick one):
- A) Update .env-template and README to instruct using Base64-encoded secrets of at least 256 bits.
- B) Or change JwtUtils.key() to Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8)) and ensure a long random secret (>= 32 chars).

3) CORS overly broad
- CorsConfig allows all origins with allowCredentials(true). For production this is dangerous; the combination implies browser will send credentials to arbitrary origins.

Action:
- Restrict to a whitelist of front-end origins via env (e.g., ALLOWED_ORIGINS). In dev allow localhost ports; in prod, only the deployed domains. Consider disabling credentials if you exclusively use Authorization: Bearer.

4) Authorization flow and 401 vs 403 framing
- WebSecurityConfig: anyRequest().access(emailVerificationAuthorizationManager). If unauthenticated, EmailVerificationAuthorizationManager returns false → likely 403 Forbidden. Typically for unauthenticated we want 401. The AuthEntryPointJwt handles 401 on authentication exceptions, but access denied may result in 403 before entrypoint triggers.

Action:
- Consider: .authorizeHttpRequests(auth -> auth.anyRequest().authenticated().requestMatchers(…public...).permitAll().anyRequest().access(emailVerification...))
- Or wrap the email verification rule as a MethodSecurity expression and keep URL-level “authenticated” to ensure proper 401 for anonymous users.
- Add a custom AccessDeniedHandler if necessary.

5) File upload hardening
- No size limits, no content-type checking, no antivirus, stores under user.dir/uploads with a path traversal check only based on “..”.
- Endpoint relies on global security; @PreAuthorize is commented out.

Action:
- Add spring.servlet.multipart.max-file-size and max-request-size (e.g., 10MB) and reject oversized files.
- Normalize path with Path.resolve and check that resulting path starts with the upload root; keep filename stripping of risky characters.
- Require explicit permission (e.g., resources:create) and enforce it via @PreAuthorize. Consider storing on object storage (S3/minio) later.

6) Redis for OTP might be overkill for < 2k users
- OtpService uses RedisTemplate but application.yml lacks spring.data.redis.* settings. docker-compose provides Redis, but host/port must be configured; otherwise it depends on defaults running on localhost.

Action (simplify):
- Consider replacing Redis with:
  - a DB table for OTPs with created_at and TTL checks, or
  - Spring Cache with Caffeine (in-memory) if single instance,
  - Store hashed OTP and rate-limit attempts to mitigate brute force.
- If keeping Redis, add necessary spring.data.redis.host/port configs and document them in .env-template, and set short TTL (e.g., 10–15 minutes instead of 60).

7) Database schema management inconsistency
- jpa.hibernate.ddl-auto: validate with flyway.enabled: false means the schema must already exist. Meanwhile DataInitializerService inserts data on startup if empty—this will fail if the schema is missing.

Action:
- Adopt Flyway for prod: enable, add V1__init.sql etc. Keep ddl-auto: validate.
- For dev: create application-dev.yml with ddl-auto: update and flyway disabled (or add dev migrations), and annotate DataInitializerService with @Profile("dev") to avoid polluting prod.

8) DataInitializerService on every startup
- Populates large dummy datasets; good for demos but risky in shared environments.

Action:
- Gate behind a profile or property: @Profile("dev") or a conditional bean with a property such as app.seed.enabled=false by default.

9) Swagger/OpenAPI exposure
- Swagger endpoints are permitAll. In production environments, you likely don’t want a public swagger UI.

Action:
- Hide swagger behind authentication and a role in prod or disable the UI with profile-based configuration.

10) .env-template redundancy and missing redis settings
- APP_JWT_SECRET and APP_JWT_EXPIRATION_MS duplicated; missing Redis properties for OtpService connectivity.

Action:
- Keep a single section and add:
  - SPRING_DATA_REDIS_HOST=redis
  - SPRING_DATA_REDIS_PORT=6379
  - Clarify base64 vs plaintext secret requirement as in item #2.

11) Docker compose hygiene
- Postgres: using PGDATA=/var/lib/postgres/data and volume mapped to that path. Official default is /var/lib/postgresql/data; your override is okay, but ensure backup/ops are aware.
- No healthchecks.
- No environment for DB name; connection URL in .env-template points to localhost rather than service name.

Action:
- Prefer service DNS names in .env for local docker (postgres, redis). Example:
  - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/ine
  - SPRING_DATASOURCE_USERNAME=hatim
  - SPRING_DATASOURCE_PASSWORD=hatim
- Add healthcheck for Postgres and Redis.
- Consider version pinning clarity: ensure Redis tag exists and stable for your environment.

12) Email/Gmail operational concerns
- If using Gmail, use App Passwords and do not store real passwords in .env for shared dev machines. Consider a transactional email provider in prod.

13) Testing
- Only a skeleton test exists.

Action (minimum):
- Auth integration tests (signin/signup, invalid creds).
- Email verification + OTP tests (happy path and invalid OTP).
- OfferServiceImpl tests (apply idempotency, filter endpoints).
- Profile access control tests (self vs admin).
- Controllers smoke tests with MockMvc and Testcontainers for Postgres if feasible.

14) Minor polish
- Remove TestController from production.
- Document required authorities for each endpoint group in README.
- Consider Spring Boot Actuator for health and readiness probes.
- Consider rate-limiting login/OTP endpoints (e.g., Bucket4j or Spring Cloud Gateway filter if applicable).

Simplification plan for ≤ 2,000 users
- Keep monolith; avoid microservices.
- Drop Redis unless you genuinely need cross-instance OTP. Use DB or in-memory cache for OTP codes with short TTL and rate limiting.
- Either remove Flyway entirely for now and rely on ddl-auto update in dev, validate in prod with manual DDL; or better: invest a little to add Flyway migrations and keep validate. Don’t keep Flyway disabled but still present.
- Lock down CORS to known front-end origins; disable credentials if possible.
- Reduce permission granularity if operationally unnecessary: ROLE_USER and ROLE_ADMIN may suffice; keep Permission enum only if you are truly using the fine-grained bits.
- Reduce exposed endpoints in prod (disable Swagger UI and TestController).

Concrete change checklist
- POM cleanup:
  - Remove versions from spring-boot-starter-security and spring-boot-starter-mail
  - Remove flyway deps or add migrations and enable
- JWT:
  - Decide Base64 vs plaintext; align JwtUtils and .env-template
- CORS:
  - Replace allowedOriginPatterns("*") with env-driven whitelist; dev only can keep localhost
- OTP:
  - Replace Redis with DB or Caffeine for single-instance deployments; if keeping Redis, add spring.data.redis.* config and document
- File upload:
  - Enforce size/content-type limits; add @PreAuthorize; normalize path robustly
- Profiles:
  - Introduce application-dev.yml and application-prod.yml; gate DataInitializerService with @Profile("dev")
  - Enable Flyway in prod, add migrations; keep ddl-auto validate
- Swagger:
  - Require auth in prod or disable UI
- Docker:
  - Switch .env connection URLs to docker service DNS (postgres, redis)
  - Add healthchecks
- Tests:
  - Add minimal integration tests for critical flows
- Docs:
  - Update README with setup instructions, env expectations (including JWT secret encoding), and origin whitelist

Notes detected in code
- Role/Permission model and method-level security are set up; APIs reference permissions like events:create, resources:update etc. This is a solid foundation if you’ll need it; otherwise can be simplified.
- EmailVerificationAuthorizationManager blocks verified users from /api/v1/email; this is intended. Ensure users can still trigger “resend verification” before verification.
- OfferServiceImpl applyToOffer is idempotent (no exception on duplicate). Good UX detail.
- GlobalExceptionHandler produces ApiResponseDto with consistent shape and logs server-side errors. Good.

Suggested snippets (reference)

- Change JwtUtils to accept plaintext secret (if preferred):
  // private Key key() { return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret)); }
  private Key key() {
    return Keys.hmacShaKeyFor(jwtSecret.getBytes(java.nio.charset.StandardCharsets.UTF_8));
  }
  Ensure APP_JWT_SECRET is at least 32 characters random.

- application-dev.yml (example):
  spring:
    jpa:
      hibernate:
        ddl-auto: update
    flyway:
      enabled: false
  app:
    seed:
      enabled: true

- application-prod.yml (example):
  spring:
    jpa:
      hibernate:
        ddl-auto: validate
    flyway:
      enabled: true

- Multipart limits (application.yml):
  spring:
    servlet:
      multipart:
        max-file-size: 10MB
        max-request-size: 10MB

- CORS with whitelist:
  @Bean
  CorsConfigurationSource corsConfigurationSource(@Value("${app.cors.allowed-origins}") List<String> allowed) {
    CorsConfiguration cfg = new CorsConfiguration();
    cfg.setAllowedOrigins(allowed);
    cfg.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
    cfg.setAllowedHeaders(List.of("Authorization","Content-Type"));
    cfg.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
    src.registerCorsConfiguration("/**", cfg);
    return src;
  }

Final thoughts
This codebase is in good shape for a small-scale monolith. The biggest wins with minimal effort are: fixing dependency versions, aligning JWT secret handling, tightening CORS, gating the data seeder, and either enabling Flyway with initial migrations or removing it to reduce confusion. Consider simplifying OTP storage for now to avoid the operational weight of Redis. Adding a handful of integration tests around auth/verification would prevent regressions and increase confidence.
