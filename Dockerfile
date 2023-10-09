# Use an official Node.js runtime as a parent image
FROM mhart/alpine-node

# Set the working directory in the container
WORKDIR /app

# Copy the rest of the application code to the container
COPY app .

# Install project dependencies
RUN npm install

# Expose the necessary port (assuming your app runs on port 9013)
EXPOSE 9013

# Start the Node.js application
CMD [ "npm", "start" ]
