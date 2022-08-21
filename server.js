require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
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