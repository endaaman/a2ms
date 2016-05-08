FROM ubuntu:14.04

RUN apt-get update
RUN apt-get install -y \
  nginx \
  curl git \
  supervisor

ENV NODE_ENV production

RUN curl -kL git.io/nodebrew | perl - setup
ENV PATH /root/.nodebrew/current/bin:$PATH
RUN nodebrew install-binary v4.4.3
RUN nodebrew use v4.4.3

RUN mkdir -p /tmp/nginx/cache/thumb
RUN \
  chown -R www-data:www-data /var/lib/nginx && \
  echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
  rm /etc/nginx/sites-enabled/default


ADD nginx/a2ms.conf /etc/nginx/sites-enabled
ADD supervisor.conf /etc/supervisor/conf.d/

RUN mkdir -p /var/www/a2ms

ADD package.json /tmp/package.json
RUN cd /tmp && NODE_ENV=development npm install
RUN mkdir -p /var/www/a2ms && cp -a /tmp/node_modules /var/www/a2ms/

ADD . /var/www/a2ms
WORKDIR /var/www/a2ms
RUN npm run build

ADD . /var/www/a2ms

CMD ["/usr/bin/supervisord"]

EXPOSE 80
