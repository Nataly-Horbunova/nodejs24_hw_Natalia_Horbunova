require('dotenv').config();
const express = require('express');
const { server } = require('config');
const logger = require('./utils/logger');
const { router: usersRouter} = require('./routes/users');

const srv = express();
const { port: serverPort } = server;

const jsonBodyParser = express.json();
srv.use(jsonBodyParser);


srv.listen(serverPort, () => console.log('Server is running on port ', serverPort));

srv.use('/users', usersRouter);

