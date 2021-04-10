# Dockerfile for React client

# Build react client
FROM node:14

# Setup work director for app
WORKDIR /usr/src/app

COPY package*.json ./

### Install dependencies
RUN npm install --silent

# Copy local files to app folder
COPY . .

# Use port 3000
EXPOSE 3000

# Start client
CMD ["npm", "start"]