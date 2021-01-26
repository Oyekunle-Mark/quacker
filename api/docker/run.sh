#!/bin/sh
if [ "$NODE_ENV" = "development" ]; then
    npm install --from-lock-file
    npm run dev
elif [ "$NODE_ENV" = "test" ]; then
    yarn test --outputFile=testOutput.json --json
    node isTestSuccessful.js
else
    npm run build
    npm start
fi
