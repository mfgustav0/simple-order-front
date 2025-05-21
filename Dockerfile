FROM node:23.11.0 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@11.3.0

RUN npm install

COPY . .

RUN npm run build-only

FROM nginx:1.23.2-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

COPY /docker/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]