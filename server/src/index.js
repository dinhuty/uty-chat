const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const path = require('path')
const cors = require('cors')
const connectDB = require('./config/database');
const route = require('./routes');
const socketServer = require('./utils/socketServer')
require('dotenv').config();

connectDB()
app.use(cors())
app.use(express.json())
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
route(app)
const port = process.env.PORT_WEB || 3001
const server = app.listen(port, () => {
    console.log(`Your running port ${port}`)
})
socketServer(server)
