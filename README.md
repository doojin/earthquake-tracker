# earthquake-tracker-backend

Building the image from Dockerfile:
`docker build -t earthquake-tracker-app .`

Starting the container:

In development environment with on port 3000:
```
docker container run --name earthquake-tracker-backend --detach --publish 3000:3000 earthquake-tracker-app
```

In production environment on port 80 and NODE_ENV=production variable:
```
docker container run --name earthquake-tracker-backend --detach --publish 80:80 --env NODE_ENV=production earthquake-tracker-app
```

test: triggering web hook: 3
