FROM node:latest

RUN mkdir -p /product-management

WORKDIR /product-management

COPY . .

RUN npm install

EXPOSE 4001

CMD ["npm", "run", "start-dev"]