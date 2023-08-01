# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code to the container
COPY . .

# Excluding unnecessary files and directories during copying
COPY .dockerignore ./

# Build the React app
RUN npm run build

# Expose the port that your React app is running on (replace 3000 with your app's port if different)
EXPOSE 3000

# Set the command to run your React app (replace "start" with your npm start script if different)
CMD ["npm", "start"]
