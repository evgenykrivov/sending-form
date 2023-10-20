FROM nginx:1.21.6
RUN rm /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html
COPY etc/nginx.conf /etc/nginx/nginx.conf