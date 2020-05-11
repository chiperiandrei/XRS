FROM node:latest

RUN mkdir -p /user-management

WORKDIR /user-management

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "start-dev"]