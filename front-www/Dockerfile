# Use Node.js 18.17.0 or later
FROM node:18.17.0 AS builder


# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY front-www/package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps 

# Copy the rest of your frontend code
COPY front-www ./

# Build the Next.js app
RUN npm run build

# Production image
FROM node:16

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Expose the port Next.js runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
