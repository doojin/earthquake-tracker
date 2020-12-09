#!/bin/sh

git pull
npm ci
npm run build
npm stop
NODE_ENV=production npm start