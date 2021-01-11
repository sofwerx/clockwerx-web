# Configure the"build" image
FROM ubuntu:18.04 AS BUILD_IMAGE

# Get the updates
RUN apt-get update -y

#COPY set working directory
RUN mkdir -p /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN apt-get install nodejs -y
RUN apt-get install -y npm 
RUN npm install -g npm@latest

COPY package.json ./
COPY .env ./
COPY echo.json ./

RUN npm install

RUN mkdir -p ./public
COPY public ./public

RUN mkdir -p ./src
COPY src ./src

RUN set NODE_OPTIONS="--max-old-space-size=4096"
ENV GENERATE_SOURCEMAP=false
RUN npm run build

# Now configure the executable image
FROM ubuntu:18.04

# Get the updates
RUN apt-get update -y

# Install and configure Apache
RUN apt-get install apache2 -y

WORKDIR /etc/apache2
RUN a2enmod headers
COPY config/apache2.conf .
COPY config/ports.conf .

WORKDIR /etc/apache2/sites-available
COPY config/clockwerxWeb.conf .

WORKDIR /var/www
RUN mkdir -p clockwerxWeb

WORKDIR /var/www/clockwerxWeb
RUN chmod -R 777 .
RUN mkdir -p logs
RUN chmod 777 logs

WORKDIR /etc/apache2/sites-available
RUN a2dissite 000-default
RUN a2ensite clockwerxWeb.conf

RUN apt-get install supervisor -y 
RUN mkdir -p /var/log/supervisor
RUN mkdir -p /etc/supervisor/conf.d
COPY config/supervisor.conf /etc/conf.d/supervisor.conf

# Copy the build artifacts to the deployment folder
WORKDIR /
COPY --from=BUILD_IMAGE /app/build /var/www/clockwerxWeb


WORKDIR /
RUN alias python=python3
CMD ["supervisord", "-c", "/etc/conf.d/supervisor.conf"]
