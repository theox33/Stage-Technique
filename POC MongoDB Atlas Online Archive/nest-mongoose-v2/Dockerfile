# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Step 4: Install all dependencies, including development dependencies
RUN npm install

# Step 5: Copy the rest of the application files to the working directory
COPY . .

# Step 6: Build the NestJS application
RUN npm run build

# Step 7: Expose the port that the app runs on
EXPOSE 3000

# Step 8: Define the command to run the app
CMD ["node", "dist/main"]
