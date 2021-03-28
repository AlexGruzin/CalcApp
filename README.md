#Install
run `cp .env.example .env`
run `yarn start`

## Available scripts:

1. `yarn start` - start dev server on `localhost:3000`
2. `yarn test` - start testing
3. `yarn build` - build sources into `/build` folder
4. `yarn lint` - make *eslint* check of the project files

## To run the app this app using Docker:

1. Run `docker-compose up -d` from the root of directory.
2. Visit http://localhost/log_in when `done` would be displayed.

(Troubleshoot: 
1. `docker rm --force calc-ui-container` and `docker image rm calc-app_calc-ui -f`
2. `sudo lsof -i tcp:80` then `kill -9 <PID>`
3. `docker-compose up -d --build --force-recreate`
)

# To be able to test connections/services integration you need to make this app accessible from outer internet 
1. Run `ngrok http -host-header="localhost:3000" 3000` or `ngrok http -host-header="localhost:80" 80`.
2. Fill .env file with url from terminal.
3. Run `yarn start` or `docker-compose up -d`.
