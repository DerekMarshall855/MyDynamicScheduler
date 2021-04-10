# Dockerfile for running node backend

FROM node:14

# Create dir for app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

# Use port 9000
CMD ["node", "index.js"]
EXPOSE 9000