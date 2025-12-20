FROM node:22-alpine

WORKDIR /app

# clean install all deps
COPY package*.json ./
RUN npm ci

# Copy app source
COPY . .

# Vite dev server port
EXPOSE 5173

# Run with host binding so it&#39;s reachable from the host/compose network
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
