FROM  nginx
RUN apt-get update -y
WORKDIR /usr/share/nginx/html
COPY . /usr/share/nginx/html/
EXPOSE 89
ENTRYPOINT ["nginx", "-g", "daemon off;"]