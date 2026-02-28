FROM  ubuntu:latest
RUN apt-get update -y
RUN apt-get install nginx -y
WORKDIR /usr/share/nginx/html
COPY . /usr/share/nginx/html/
EXPOSE 89
ENTRYPOINT ["nginx", "-g", "daemon off;"]