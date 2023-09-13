const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./config/database');
const route = require('./routes');
require('dotenv').config();

connectDB()
app.use(cors())
app.use(express.json())

route(app)
const port = process.env.PORT_WEB || 3002
app.listen(port, () => {
    console.log(`Your running port ${port}`)
})