const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

app.use(cors())

app.use(express.static('public'))

const userRoute = require('./routes/userRoutes')
app.use('/user', userRoute)

app.listen(port, () => {console.log(`Listening on port: ${port}`)});