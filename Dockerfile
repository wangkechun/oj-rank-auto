FROM ubuntu:15.04
RUN apt-get update
RUN apt-get install python python-dev python-pip python-scrapy python-requests -y
RUN apt-get install redis-server -y
RUN pip install redis
RUN apt-get install nginx -y
ADD ./ /src
ADD nginx-conf /etc/nginx/sites-enabled/default
CMD /bin/bash
EXPOSE 80
