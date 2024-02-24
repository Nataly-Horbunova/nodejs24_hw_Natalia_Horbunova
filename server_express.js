require('dotenv').config();
const express = require('express');
const { server } = require('config');
const { router: usersRouter} = require('./routes/users');
const morgan = require('morgan');
const { STATUS } = require('./constants');

const srv = express();
const { port: serverPort } = server;

const jsonBodyParser = express.json();
srv.use(jsonBodyParser);

srv.use(morgan(':method :url :status '));

srv.listen(serverPort, () => console.log('Server is running on port ', serverPort));

srv.use('/users', usersRouter);

srv.use(handleError);

function handleError(err, req, resp, _next) {
    console.log('An error occured:', err.message);
    resp.send(STATUS.ServerError, { error: err.message });
}
