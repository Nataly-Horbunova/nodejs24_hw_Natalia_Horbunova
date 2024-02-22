require('dotenv').config();
const express = require('express');
const { server } = require('config');
const logger = require('./utils/logger');

const srv = express();
const { port: serverPort } = server;

srv.listen(serverPort, () => console.log('server is running on port ', serverPort));

