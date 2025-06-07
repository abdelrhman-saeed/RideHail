# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy only package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --include=dev

# Copy the rest of the source code
COPY . .

# Expose the app port
EXPOSE 3001

# Run app in development mode
CMD ["npm", "run", "dev"]
