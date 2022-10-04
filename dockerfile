FROM tiangolo/uwsgi-nginx-flask:python3.8

COPY ./app /app
COPY ./babylon /app/babylon
RUN mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf_orig
# COPY fullchain.pem /cert/
# COPY privkey.pem /cert
COPY nginx.conf /app
RUN cp nginx.conf /etc/nginx/nginx.conf
RUN pip3 install paho-mqtt
RUN pip3 install Flask-MQTT
RUN pip3 install flask-cors
#ENTRYPOINT FLASK_APP=/app/babylon.py flask run --host=0.0.0.0
ENV FLASK_APP=/app/babylon.py
#CMD ["./app/run_app.sh"]
# ENTRYPOINT ["/bin/bash"]
# CMD ["/app/run_app.sh"]
# CMD ["/start.sh"]
# CMD ["/usr/local/bin/flask","run","--host=0.0.0.0"]
# ENTRYPOINT ['/entrypoint.sh']
#ENTRYPOINT ["sh","/app/run_app.sh"]
