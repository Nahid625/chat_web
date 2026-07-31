FROM nginx:alpine

# Purge default configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your local configs directly into the image
COPY nginx.conf /etc/nginx/nginx.conf
COPY sites-available/ /etc/nginx/sites-available/
COPY sites-enabled/ /etc/nginx/sites-enabled/

EXPOSE 80