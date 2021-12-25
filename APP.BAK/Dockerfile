FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 4000
EXPOSE 27017
CMD ["node", "src/index.js"]