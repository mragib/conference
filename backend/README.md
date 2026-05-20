`npm run build`

Copy dist folder, .env and package.json to production

`npm i`

`pm2 start dist/main.js --name test-nest-app --env production`
