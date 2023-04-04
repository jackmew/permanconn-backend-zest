# Use the official Node.js LTS (Long Term Support) base image
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install all dependencies (including devDependencies for TypeScript compilation)
RUN npm ci

# Copy the TypeScript source code from src/ directory to the working directory
COPY src/ src/

# Copy the tsconfig.json file to the working directory
COPY tsconfig.json ./

# Compile TypeScript to JavaScript
RUN npm run build

# Remove devDependencies after TypeScript compilation
RUN npm prune --production

# Expose the port that your app will run on
EXPOSE 3001

# Start the application using the compiled JavaScript in the "dist" folder
CMD ["node", "dist/server.js"]
