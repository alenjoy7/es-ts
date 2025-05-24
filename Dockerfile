# Base image with Node.js
FROM node:23-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate
# Set working directory
WORKDIR /app

# Copy only package files and install dependencies
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

# Copy everything else
COPY . .

# Generate auth and build TypeScript code
RUN  pnpm dlx prisma generate && pnpm build

EXPOSE 8080
# Use the built JS files to run the app
CMD ["node", "dist/src/index.js"]
