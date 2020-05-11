FROM node:latest

RUN mkdir -p /file-management

WORKDIR /file-management

COPY . .

RUN npm install

EXPOSE 4000

CMD ["npm", "run", "start-dev"]