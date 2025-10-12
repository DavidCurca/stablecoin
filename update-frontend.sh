#!/bin/bash

VPS_IP=5.161.94.243

cd ronc-frontend
npm run build
rsync -avz --progress dist/ root@$VPS_IP:/var/www/ronc-frontend
