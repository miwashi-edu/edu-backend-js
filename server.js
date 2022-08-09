require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const healthcheck = require('healthcheck')

//const bodyparser = reuire('bodyparser')

//console.log(process.env)
const PORT = process.env.PORT || 3000
ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

console.log('****** NODE_ENV *******')
console.log(process.env.NODE_ENV)
console.log('****** NODE_ENV *******')

const app = express()
app.use(express.json())
app.use('/healthcheck', require('./routes/healthcheck.routes'));

app.get("/", (req ,res) => {
   headers={"cache-control":  "no-cache"}
   body={"status": "available"}
   res.status(200).json(body)
})

app.post("/authenticate", (req ,res) => {
    headers={"cache-control":  "no-cache"}
    const username = req.body.username
    const accessToken = jwt.sign({ name: username }, ACCESS_TOKEN_SECRET)
    console.log(jwt.json)
    res.status(200).json({accessToken: accessToken})
 })

 app.get("/secret", authenticateToken, (req ,res) => {
    console.log("In secret")
    res.json({user: req.user.name})
 })

app.listen(PORT , ()=>{
     console.log(`STARTED LISTENING ON PORT ${PORT}`)
});

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return  res.sendStatus(401)

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}