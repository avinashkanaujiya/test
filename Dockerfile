FROM nginx:alpine
COPY build /usr/share/nginx/html
COPY nginx.config /etc/nginx/nginx.conf