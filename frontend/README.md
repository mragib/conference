pm2 start dist/main.js --name nest-app --env production

curl -u "webview:*webview@eu#" http://localhost:8002
curl -u "webview:*webview@eu#" http://localhost:8002/admission/popup
