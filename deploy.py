import os

FRONTEND_REPO = 'https://github.com/doojin/earthquake-tracker-frontend'


def run_command(description, command, **kwargs):
    print('%s...' % description)

    original_dir = os.getcwd()

    if 'dir' in kwargs:
        os.chdir(kwargs['dir'])

    print(command)
    os.system(command)

    if 'dir' in kwargs:
        os.chdir(original_dir)

    print('done!\n')


run_command('stopping the server', 'npm stop')
run_command('pulling latest changes', 'git pull')
run_command('installing backend dependencies', 'npm install')
run_command('cleaning frontend directory', 'rm -rf frontend')
run_command('cloning frontend project', 'git clone %s frontend' % FRONTEND_REPO)
run_command('installing frontend dependencies', 'npm install', dir='./frontend')
run_command('compiling frontend project', 'npm run build', dir='./frontend')
run_command('compiling backend project', 'npm run build')
run_command('starting the server', 'NODE_ENV=production npm start')
