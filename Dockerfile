FROM nginx:1.17.9-alpine

WORKDIR /usr/share/nginx/html
COPY src .