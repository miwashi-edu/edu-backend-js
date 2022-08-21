# edu-backend-js

## Create backend project

``` bash
cd ~ # Gå till din hemkatalog
cd ws # Gå till ditt workspace
mkdir edu-backend # Skapa en projekt mapp
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
require('dotenv').config()
const express = require('express')
const healthcheck = require('healthcheck')

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use('/health', require('./routes/healthcheck.js'));
app.use('/user', require('./routes/user.js'));

app.get("/", (req ,res) => {
   headers={"cache-control":  "no-cache"}
   body={"status": "available"}
   res.status(200).json(body)
})

app.listen(PORT , ()=>{
   console.log(`STARTED LISTENING ON PORT ${PORT}`)
});
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
const express = require("express")

const router = express.Router({});
router.get('/', async (_req, res, _next) => {
	
	const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};
	try {
		res.send(healthcheck);
	} catch (e) {
		healthcheck.message = e;
		res.status(503).send();
	}
});

module.exports = router;
```

### ./routes/user.js
```js
const uuid = require('uuid');
const express = require("express")

let users = {}
const router = express.Router({})

//Create
router.post('/', async (req, res, next) => {
	if(!req.body.hasOwnProperty('email')){
		res.statusCode = 400
		res.send('User email is mandatory!')
		return
	}

	if(!req.body.hasOwnProperty('password')){
		res.statusCode = 400
		res.send('User password is mandatory!')
		return
	}

	if(!req.body.hasOwnProperty('username')){
		res.statusCode = 400
		res.send('Username is mandatory!')
		return
	}

	const id = req.body.email
	if( users[id]!== undefined){
		res.statusCode = 400
		res.send('User already exist, use PUT for update!')
		return
	}

	users[id] = {
			id: req.body.email,
			user: req.body.username,
			email: req.body.email,
			password: req.body.password
		}

	res.send(users)
});

//Read
router.get('/', async (req, res, next) => {
	const result = []
	for (const [key, user] of Object.entries(users)) {
		result.push(user.email)
	}
	res.send(result)
});

router.get('/:id', async (req, res, next) => {
	if(req.params.id == undefined){
		res.statusCode = 400
		res.send('User email is mandatory!')
		return
	}
	
	if( users[req.params.id]== undefined){
		res.statusCode = 400;
		res.send('User not found!')
		return
	}

	const user = {
		username: users[req.params.id].user,
		email: users[req.params.id].email
	}
	res.send(user)
});

//Update
router.put('/:id', async (req, res, next) => {
	if( users[req.params.id]== undefined){
		res.statusCode = 400;
		res.send('User not found!')
		return
	}
	let user = users[req.params.id]

	if(req.body.hasOwnProperty('email')){
		user.email = req.body.email
	}

	if(req.body.hasOwnProperty('username')){
		user.user = req.body.username
	}

	if(req.body.hasOwnProperty('password')){
		user.password = req.body.password
	}

	res.send()
});

//Delete
router.delete('/:id', async (req, res, next) => {
	if(req.params.id == undefined){
		res.statusCode = 400
		res.send('User email is mandatory!')
		return
	}
	
	if( users[req.params.id]!== undefined){
		users.delete[req.params.id]
	}
	res.send({status: "ok"})
});

module.exports = router;
```
## Tests

### ./__tests__/unit.js
```js
/**
 * @group unit
 */

 const calculator = require('../calculator.js')

 test ('Calculator should add!', () =>{
     expect(calculator.add('1')).toBe(1)
 })
```
### ./__tests__/component.js
```js
/**
 * @group component
 */

 const calculator = require('../calculator.js')

 test ('Calculator should add!', () => {
     expect(calculator.add('1, 1')).toBe(2)
 })

 test ('Calculator should add!', () => {
    expect(calculator.add('2, 3')).toBe(5)
})
```

### -/__tests__/integration.js
```js
/**
 * @group integration
 */

 const calculator = require('../calculator.js')

 test ('Calculator should add!', () => {
     expect(calculator.add('1, 1')).toBe(2)
 })

 test ('Calculator should add!', () => {
    expect(calculator.add('2, 3')).toBe(5)
})
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
GET http://localhost:3000/user

###

GET http://localhost:3000/user/anyname1@anydomain.com

###
POST  http://localhost:3000/user
Content-Type: application/json

{
    "username": "user",
    "password": "password",
    "email": "anyname1@anydomain.com"
}

###
POST  http://localhost:3000/user
Content-Type: application/json

{
    "username": "user",
    "password": "password",
    "email": "anyname2@anydomain.com"
}

###
POST  http://localhost:3000/user
Content-Type: application/json

{
    "username": "user",
    "password": "password",
    "email": "anyname3@anydomain.com"
}

###

POST  http://localhost:3000/user
Content-Type: application/json

{
    "username": "user",
    "password": "password"
}

###

DELETE http://localhost:3000/user/anyname1@anydomain.com

###

DELETE http://localhost:3000/user/anyname2@anydomain.com

###

DELETE http://localhost:3000/user/anyname3@anydomain.com

###

PUT http://localhost:3000/user/anyname1@anydomain.com
Content-Type: application/json

{
    "email": "anyname4@anydomain.com",
    "username": "newuser",
    "password": "newpassword"
}

```
