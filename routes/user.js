const express = require("express")
const router = express.Router({})

let users = {}

//Create
router.post('/', async (req, res, next) => {
	if(!req.body.hasOwnProperty('email')){
		res.status(400).send('User email is mandatory!')
		return
	}

	if(!req.body.hasOwnProperty('password')){
		res.status(400).send('User password is mandatory!')
		return
	}

	if(!req.body.hasOwnProperty('username')){
		res.status(400).send('Username is mandatory!')
		return
	}

	const id = req.body.email
	if( users[id]!== undefined){
		res.status(400).send('User already exist, use PUT for update!')
		return
	}

	users[id] = {
			id: req.body.email,
			user: req.body.username,
			email: req.body.email,
			password: req.body.password
		}

	res.status(200).send(users)
});

//Read
router.get('/', async (req, res, next) => {
	const result = []
	for (const [key, user] of Object.entries(users)) {
		result.push(user.email)
	}
	res.status(200).send(result)
});

router.get('/:id', async (req, res, next) => {
	if(req.params.id == undefined){
		res.status(404).send('User email is mandatory!')
		return
	}
	
	if( users[req.params.id]== undefined){
		res.status(404).send('User not found!')
		return
	}

	const user = {
		username: users[req.params.id].user,
		email: users[req.params.id].email
	}
	res.status(200).send(user)
});

//Update
router.put('/:id', async (req, res, next) => {
	if( users[req.params.id]== undefined){
		res.status(404).send('User not found!')
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

	res.status(200).send()
});

//Delete
router.delete('/:id', async (req, res, next) => {
	if(req.params.id == undefined){
		res.status(400).send('User email is mandatory!')
		return
	}
	
	if( users[req.params.id]!== undefined){
		users.delete[req.params.id]
	}
	res.status(200).send({status: "ok"})
});

module.exports = router;