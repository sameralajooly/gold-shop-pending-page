# Use nginx as a lightweight static web server for Cloud Run
FROM nginx:alpine

# Remove the default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Update nginx configuration to listen on port 8080 instead of 80
RUN sed -i 's/listen  *80;/listen 8080;/g' /etc/nginx/conf.d/default.conf && \
    sed -i 's/listen  *\[::\]:80;/listen [::]:8080;/g' /etc/nginx/conf.d/default.conf

# Copy the site content into the nginx web root
COPY . /usr/share/nginx/html

# Expose the port Cloud Run expects
EXPOSE 8080

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
