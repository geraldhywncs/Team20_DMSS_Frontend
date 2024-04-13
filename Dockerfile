# Use the latest Node.js image
FROM node:latest

# Set the working directory to the application directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json tailwind.config.js .env /app/

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY src/ /app/src/
COPY public/ /app/public/
# COPY build/ /app/build/

# Set the entrypoint to start the frontend application
ENTRYPOINT ["npm", "run", "start"]
