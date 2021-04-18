FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY /dist/Angular-Crypto /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]