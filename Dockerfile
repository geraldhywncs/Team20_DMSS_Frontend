# Use the latest Node.js image
FROM node:latest

# Set the working directory to the application directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json tailwind.config.js .env /app/

# Install dependencies
RUN npm install
RUN npm install -g serve

# Copy the rest of the application files to the container
COPY src/ /app/src/
COPY public/ /app/public/

# Build
RUN npm run build

# Set the entrypoint to start the frontend application
ENTRYPOINT ["serve", "-s", "build"]
