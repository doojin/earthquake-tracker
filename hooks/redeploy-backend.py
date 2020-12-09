#!/usr/bin/env python3

import os

os.chdir('../')
os.system('npm stop')
os.system('git pull')
os.system('npm ci')
os.system('npm run build')
os.system('NODE_ENV=production npm start')