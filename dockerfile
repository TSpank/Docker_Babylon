FROM tiangolo/uwsgi-nginx-flask:python3.8

COPY ./app /app
# COPY ./babylon /app/babylon
RUN mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf_orig
RUN apt-get update && apt-get install -y curl
COPY nginx.conf /app
RUN cp nginx.conf /etc/nginx/nginx.conf
COPY ./app/mojo.r7d.xyz.crt /etc/nginx
COPY ./app/mojo.r7d.xyz.key /etc/nginx
RUN pip3 install paho-mqtt
RUN pip3 install Flask-MQTT
RUN pip3 install flask-cors
ENV FLASK_APP=/app/babylon.py