const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

//app.use('/healthcheck', require('./routes/healthcheck.routes'));

app.get("/", (req ,res)=>{
   headers={"http_status":200, "cache-control":  "no-cache"}
   body={"status": "available"}
   res.status(200).send(body)
})

app.listen(PORT , ()=>{
     console.log(`STARTED LISTENING ON PORT ${PORT}`)
});