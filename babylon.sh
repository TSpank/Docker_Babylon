# docker run -d --restart unless-stopped --name mojo -p 5005:5000 -p 443:443 babylon
docker run  --restart unless-stopped --name mojo -v ./babylon:/app/babylon  -p 5005:5000 -p 443:443 babylon
