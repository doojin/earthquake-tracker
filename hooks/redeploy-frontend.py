#!/usr/bin/env python3

import os

os.chdir('../frontend')
os.system('git pull')
os.system('npm ci')
os.system('npm run build')