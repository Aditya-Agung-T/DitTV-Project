# Stage 1: Build the frontend
FROM node:18 AS frontend-builder
WORKDIR /usr/src/app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Create the production image
FROM node:18
WORKDIR /usr/src/app
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
COPY --from=frontend-builder /usr/src/app/dist ./frontend/dist

EXPOSE 8080
CMD [ "npm", "start" ]
