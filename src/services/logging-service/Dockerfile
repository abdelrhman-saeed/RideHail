# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy only package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --include=dev

# Don't copy source code — it's mounted from host via volumes
# COPY . .

# Set module path for imports
# ENV NODE_PATH=src

# Run app in development mode
CMD ["npm", "run", "dev"]
