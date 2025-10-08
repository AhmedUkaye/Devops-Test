# Use official Node.js 20 LTS image as base
FROM node:20

# Set working directory in container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the app
COPY . .

# Expose port (matches the app PORT)
EXPOSE 3000

# Default command to run the app
CMD ["node", "server.js"]

