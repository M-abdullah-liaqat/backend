bashCopy code
# Use the official Node.js image as the base image
FROM node:22

WORKDIR /app

COPY package*.json ./

# Install the application dependencies
RUN npm install
COPY . .
EXPOSE 5000
# Define the entry point for the container
CMD ["node", "backend.js"]