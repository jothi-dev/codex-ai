# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /server

# Copy the backend package.json and package-lock.json
COPY ./server/* .

# Install backend dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the app
CMD ["npm", "start"]
