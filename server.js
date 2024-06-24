const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { expressjwt } = require('express-jwt')
const port = process.env.PORT || 6700
const path = require("path")

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "dist")))

mongoose.set('strictQuery', true)
mongoose.connect(
  process.env.MONGO_URI,
  (err) => console.log('Connected to DB', err)
)
app.use('/api/auth', require('./routes/authRouter'))
app.use('/api/secured', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })) 
app.use('/api/secured/issues', require('./routes/IssueRouter'))
app.use('/api/secured/comments', require('./routes/commentRouter'))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === 'UnauthorizedError'){
      res.status(err.status)
    }
    return res.send({errMsg: err.message})
  })

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});  
app.listen(port, () => console.log(`Example app listening on port ${port}!`))