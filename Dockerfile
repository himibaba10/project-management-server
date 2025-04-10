# Use NodeJS 22.14.0 as the base image
FROM node:22.14.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install the dependencies defined in package.json
RUN npm install

#Copy the rest of the application code to the container working directory
COPY . .

# Run the TypeScript compiler (use the npm script you defined)
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application (use the npm script you defined)
CMD ["npm", "run", "start:dev"]