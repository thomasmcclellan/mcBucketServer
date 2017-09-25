const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router.js');
const mongoose = require('mongoose');
const cors = require('cors');

//DB Connection
mongoose.connect('mongodb://mcbucket:mcbucket1@ds141434.mlab.com:41434/bucketlist' || 'mongodb://localhost:bucket/bucket');

//Middleware
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);
console.log('Server listening on ' + port);