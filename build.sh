#!/bin/bash

git pull origin master
NODE_ENV_BACK=$NODE_ENV
NODE_ENV=development
npm install
NODE_ENV=$NODE_ENV_BACK
npm run prod
nginx -s reload
