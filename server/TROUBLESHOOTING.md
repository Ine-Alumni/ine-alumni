# Troubleshooting Guide

Common issues and solutions when running INE Alumni with Docker Compose:

---
## Email Configuration

### Using Real SMTP (Gmail, Outlook, etc.)

Most developers use real SMTP servers for email functionality. Configure via environment variables:

**PowerShell (Windows):**
```powershell
$env:SPRING_MAIL_HOST="smtp.gmail.com"
$env:SPRING_MAIL_PORT="587"
$env:SPRING_MAIL_USERNAME="your-email@gmail.com"
$env:SPRING_MAIL_PASSWORD="your-app-password"
$env:APP_JWT_SECRET="your-jwt-secret"

docker-compose up --build
```

**Bash (Linux/Mac/Git Bash):**
```bash
export SPRING_MAIL_HOST="smtp.gmail.com"
export SPRING_MAIL_PORT="587"
export SPRING_MAIL_USERNAME="your-email@gmail.com"
export SPRING_MAIL_PASSWORD="your-app-password"
export APP_JWT_SECRET="your-jwt-secret"

docker-compose up --build
```

**Gmail Setup:**
1. Enable 2-Factor Authentication: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use the 16-character app password (not your regular password)

**Outlook/Office365:**
```bash
SPRING_MAIL_HOST=smtp.office365.com
SPRING_MAIL_PORT=587
```

---

## Common Issues

### 1. Gmail SMTP Timeout from Docker

**Error:**
```
SocketTimeoutException: Connect timed out
MailConnectException: Couldn't connect to smtp.gmail.com:587
```

**Cause:** Docker containers have isolated network IPs. Gmail may block connections from unknown container IPs.

**Solutions:**

**A. Use MailHog (Local Testing)**
```yaml
# Add to docker-compose.yml services:
mailhog:
  image: mailhog/mailhog:latest
  ports:
    - "1025:1025"  # SMTP
    - "8025:8025"  # Web UI
  networks:
    - ine-net
```

Update server environment:
```yaml
SPRING_MAIL_HOST: mailhog
SPRING_MAIL_PORT: 1025
```

View emails at http://localhost:8025

**B. Use Host Network (Advanced)**
Only if MailHog won't work for your use case. Note: This may break container-to-container networking.

**C. Use Cloud SMTP Service**
- AWS SES
- SendGrid
- Mailgun

These services are designed for programmatic email sending.

---

### 2. PostgreSQL SSL Connection Error

**Error:**
```
PSQLException: FATAL: no pg_hba.conf entry for host "172.18.0.X", user "hatim", database "ine", no encryption
```

**Cause:** PostgreSQL requires SSL by default but JDBC connection isn't using it.

**Solution:**
Already fixed in docker-compose.yml:
```yaml
SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/ine?sslmode=disable
```

For production, use `?sslmode=require` with proper SSL certificates.

---

### 3. JWT Secret Base64 Error

**Error:**
```
DecodingException: Illegal base64 character
```

**Cause:** JWT secret contains characters that aren't valid Base64.

**Solution:**
Use Base64-encoded secret:
```powershell
$env:APP_JWT_SECRET="bG9jYWxkZXZqd3RzZWNyZXRrZXljaGFuZ2VpbnByb2R1Y3Rpb25taW4yNTZiaXRzcmVxdWlyZWRmb3JzZWN1cml0eQ=="
```

Or use default from docker-compose.yml (already Base64-encoded).

---

### 4. Backend Won't Start

**Check logs:**
```bash
docker-compose logs -f server
```

**Common causes:**

**A. Missing environment variables**
```bash
# PowerShell - verify exports
Get-ChildItem Env: | Where-Object { $_.Name -like "*SPRING*" }
echo $env:APP_JWT_SECRET

# Bash - verify exports
env | grep SPRING
echo $APP_JWT_SECRET
```

**B. Database not ready**
```bash
# Check PostgreSQL health
docker exec -it postgres pg_isready -U hatim -d ine

# Should return: "postgres:5432 - accepting connections"
```

**C. Port already in use**
```bash
# Windows
netstat -ano | findstr :8080

# Linux/Mac
lsof -i :8080
```

**Solution:** Stop conflicting process or change port in docker-compose.yml

---

### 5. Frontend Can't Connect to Backend

**Error in browser console:**
```
Failed to fetch
Network Error
CORS Error
```

**Solutions:**

**A. Verify backend is running**
```bash
curl http://localhost:8080/actuator/health
# Should return: {"status":"UP"}
```

**B. Check CORS configuration**
Backend allows all origins in development (see `CorsConfig.java`). For production, restrict to your frontend domain.

**C. Verify API URL**
Frontend uses: `VITE_API_URL=http://localhost:8080/api/v1`

If backend is on different port, update in docker-compose.yml:
```yaml
client:
  environment:
    VITE_API_URL: http://localhost:YOUR_PORT/api/v1
```

---

### 6. Can't See Sent Emails

**If using MailHog:**
1. Check MailHog is running: `docker ps | grep mailhog`
2. Access web UI: http://localhost:8025
3. Check backend logs for SMTP connection: `docker-compose logs -f server`

**If using Gmail/SMTP:**
1. Check sent folder in your email account
2. Verify credentials are correct
3. Check spam folder for test emails

---

### 7. Database Data Loss After Restart

**Cause:** No volume configured or volume deleted.

**Solution:**
Volumes are configured in docker-compose.yml:
```yaml
volumes:
  ine-postgres:
  ine-redis:
```

**Don't use:** `docker-compose down -v` (deletes volumes)
**Use:** `docker-compose down` (preserves data)

**To intentionally reset database:**
```bash
docker-compose down -v
docker-compose up --build
```

---

### 8. PowerShell vs Bash Differences

**PowerShell (Windows):**
- Set variable: `$env:VARIABLE="value"`
- View variable: `echo $env:VARIABLE`
- Clear variable: `Remove-Item Env:\VARIABLE`

**Bash (Linux/Mac/Git Bash):**
- Set variable: `export VARIABLE="value"`
- View variable: `echo $VARIABLE`
- Clear variable: `unset VARIABLE`

**Important:** Environment variables only last for current terminal session. Close terminal = variables lost.

---

## Database Management

### Connect to PostgreSQL
```bash
docker exec -it postgres psql -U hatim -d ine
```

### Useful Commands
```sql
-- List all tables
\dt

-- View users
SELECT * FROM inpt_users;
SELECT * FROM admins;

-- Delete specific users
DELETE FROM inpt_users WHERE id IN (1, 2, 3);

-- Reset all users
TRUNCATE TABLE inpt_users CASCADE;

-- Exit
\q
```

### Reset Database Completely
```bash
# Stop containers and delete volumes
docker-compose down -v

# Start fresh
docker-compose up --build
```

---

## Complete Clean Start

If everything is broken, nuclear option:

```bash
# Stop all containers
docker-compose down -v

# Remove all INE Alumni images
docker rmi $(docker images | grep ine-alumni | awk '{print $3}')

# Clear environment variables (PowerShell)
Remove-Item Env:\SPRING_MAIL_* -ErrorAction SilentlyContinue
Remove-Item Env:\APP_JWT_SECRET -ErrorAction SilentlyContinue

# Clear environment variables (Bash)
unset SPRING_MAIL_HOST SPRING_MAIL_PORT SPRING_MAIL_USERNAME SPRING_MAIL_PASSWORD
unset APP_JWT_SECRET

# Set required variables
# PowerShell:
$env:APP_JWT_SECRET="add-your-jwt-key-here"

# Bash:
export APP_JWT_SECRET="add-your-jwt-key-here

# Start fresh
docker-compose up --build
```

---

## Verify Everything Works

```bash
# 1. Check all containers running
docker-compose ps
# Should show: postgres, redis, server, client (all healthy)

# 2. Check backend health
curl http://localhost:8080/actuator/health
# Should return: {"status":"UP"}

# 3. Check frontend
# Open http://localhost:5173 in browser

# 4. Check database
docker exec -it postgres pg_isready -U hatim -d ine
# Should return: "accepting connections"

# 5. Check logs for errors
docker-compose logs -f
```

---

## Getting Help

1. **Check logs first:**
   ```bash
   docker-compose logs -f server  # Backend logs
   docker-compose logs -f client  # Frontend logs
   docker-compose logs -f postgres  # Database logs
   ```

2. **Search existing issues:** Check GitHub Issues for similar problems

3. **Create new issue:** Include:
    - Error message (full stack trace)
    - Steps to reproduce
    - Your environment (OS, Docker version)
    - Relevant logs

4. **Ask the team:** Tag maintainers in issue or PR

---

## Additional Resources

- **Docker Compose docs:** https://docs.docker.com/compose/
- **Spring Boot docs:** https://spring.io/projects/spring-boot
- **PostgreSQL docs:** https://www.postgresql.org/docs/
- **Contributing Guide:** [CONTRIBUTING.md](../CONTRIBUTING.md)