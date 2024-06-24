# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /client

# Copy client code
COPY ./client/* .

# Install backend dependencies
RUN npm install

RUN ls -la ./assets

# Expose the port the app runs on
EXPOSE 5173

# Define the command to run the app
CMD ["npm", "run", "dev"]
