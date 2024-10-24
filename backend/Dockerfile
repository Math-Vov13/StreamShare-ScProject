# Use the official Node.js image as a base image
FROM node:16

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json to install dependencies
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend code
COPY backend ./

# Expose the port your backend server runs on
EXPOSE 5000

# Start the backend application
CMD ["npm", "start"]
