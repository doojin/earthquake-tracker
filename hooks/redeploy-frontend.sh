#!/bin/sh

cd frontend
git pull
npm ci
npm run build