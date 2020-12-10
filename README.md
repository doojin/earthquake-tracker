# Earthquake tracker backend

## Project status

![test-lint-deploy](https://github.com/doojin/earthquake-tracker/workflows/test-lint-deploy/badge.svg)

## About

Backend of the earthquake tracker project: [service](http://eqtracker.tk) to display earthquakes online.

## Installation

```sh
npm install
npm run build
npm start
```

Running `npm start` will start application in background. You can run: `npm stop` in order to stop an already 
running application.

## Deployment

```sh
npm run deploy
```

This command will run a deployment script which:

1. Stops an already running application
2. Pulls latest project changes from Github
3. Re-installs project dependencies
4. Removes the directory containing the frontend code
5. Clones the frontend project
6. Installs frontend project dependencies
7. Compiles both: frontend and backend projects
8. Starts an application in production mode
9. Starts webhooks which will be listening for re-deployment events fired by Github actions

## Webhooks

Project comes with a lightweight webhook server running on the 9000 port on the same host as main web server.

On every master branch push, if test and lint checks are passed, the requests is sent to the webhook endpoint
causing redeployment of backend or frontend parts of the project.

Webhook endpoint is secured with a secret. Environment variable `GITHUB_SECRET` on the host machine is required
for the correct execution of webhook service.
