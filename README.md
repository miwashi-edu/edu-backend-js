# edu-backend-js

## Create backend project

``` bash
cd ~
cd ws
mkdir edu-backend
cd edu-backend
npm init -y
mv app.js server.js
touch .env
touch app.json
touch Procfile
touch Dockerfile
touch request.rest
mkdir routes
touch routes/healthcheck.js
touch routes/user.js
mkdir __tests__
touch ./__tests__/component.js
touch ./__tests__/unit.js
npm install express --save
npm install healthcheck --save
npm install dotenv --save
npm install cors --save
npm install jsonwebtoken --save
npm install nodemon --save-dev
npm install jest --save-dev
npm install jest-runner-groups --save-dev
code .
```

## Application

### server.js
```js

```

### calculator.js
```js
function add(numbers) {
    return numbers
        .split(',').map(x => parseInt(x)).reduce((a, b) => a + b)
}
exports.add = add;
```

### package.json
```json
{
  "name": "edu-backend",
  "version": "1.0.0",
  "description": "Simple backend server.",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest  --group=-component --group=-integration",
    "componenttest": "jest  --group=component",
    "integrationtest": "jest  --group=integration"
  },
  "jest": {
    "runner": "groups"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/miwashi-edu/edu-backend-js.git"
  },
  "author": "Mikael Wallin",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/miwashi-edu/edu-backend-js/issues"
  },
  "homepage": "https://github.com/miwashi-edu/edu-backend-js#readme",
  "dependencies": {
    "body-parser": "^1.19.1",
    "cors": "^2.8.5",
    "dotenv": "^16.0.1",
    "express": "^4.17.2",
    "healthcheck": "^0.1.3",
    "jsonwebtoken": "^8.5.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.19",
    "jest": "^28.1.3",
    "jest-runner-groups": "^2.2.0"
  }
}
```

## Routes
### ./routes/healtcheck.js
```js
```

### ./routes/user.js
```js
```
## Tests

### ./__tests__/unit.js
```js
```
### ./__tests__/component.js
```js
```
## Heroku

### Procfile
```bash
web: npm start
```

### app.json
```json
{
    "name": "edu-backend",
    "description": "Simple backend server",
    "repository": "https://github.com/miwashi-edu/edu-backend-js.git",
    "logo": "https://cdn.rawgit.com/heroku/node-js-getting-started/main/public/node.svg",
    "keywords": ["node", "express", "heroku"],
    "image": "heroku/nodejs"
}
```

## Docker

## Dockerfile
```docker
FROM node:12-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "server.js" ]
```

## Testing

### request.rest

```
POST  http://localhost:3000/user
Content-Type: application/json

{
    "usernname": "user",
    "usernname": "password",
    "email": "anyname@anydomain.com"
}
```
