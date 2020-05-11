FROM node:latest

RUN mkdir -p /borrow-management

WORKDIR /borrow-management

COPY . .

RUN npm install

EXPOSE 4002

CMD ["npm", "run", "start-dev"]