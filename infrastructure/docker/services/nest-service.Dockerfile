FROM node:20-alpine AS builder
WORKDIR /app

ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx nest build ${SERVICE_NAME}

FROM node:20-alpine AS runner
WORKDIR /app

ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}

COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000 3001 3002 3003 3004 3005 3006

CMD ["sh","-c","node dist/apps/${SERVICE_NAME}/main.js"]

