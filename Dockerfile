FROM node:18

WORKDIR /app

COPY ContactManagementSystem-ReactJS-v2/package*.json ./

RUN npm install 

COPY ./ContactManagementSystem-ReactJS-v2 .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]