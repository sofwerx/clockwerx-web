#!/bin/bash
sudo rm -f /var/www/clockwerxWeb/*.js
sudo rm -rf /var/www/clockwerxWeb/static
sudo rm -f /var/www/clockwerxWeb/index.html
sudo cp -r ../build/* /var/www/clockwerxWeb/.

