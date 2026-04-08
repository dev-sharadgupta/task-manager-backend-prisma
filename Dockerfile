# Use official Node.js image
FROM node:22-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of source code
COPY . . 

# Generate Prisma Client
RUN npm run prisma:generate

# Build TS (Create the build file)
RUN npm run build

# Expose port
EXPOSE 3000

# Start command (Execute the build file)
CMD ["node", "build/src/index.js"]


# docker compose exec app npx prisma migrate deploy (manually hit)
# docker build -t sharad2905/task-manager-prisma:latest .
# docker push sharad2905/task-manager-prisma:latest