const express = require('express')
const config = require('config')
const app = express()

const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

app.use(cookieParser())
app.use(express.json())

mongoose.connect(config.get('mongoUri'),{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true},(err => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected to database')
    }
}))

const userRouter = require('./routes/User')

app.use('/user', userRouter)


app.listen(config.get('port'), () => console.log('server started'))