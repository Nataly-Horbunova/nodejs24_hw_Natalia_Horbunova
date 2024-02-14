require('dotenv').config();
const http = require('http');
const logger = require('./utils/logger')('server');

const server = http.createServer();
const port = 3000;
server.listen(port);

server.on('listening', () => logger.info(`Server is wating on [${port}] port`)); 

server.on('request', (req, resp) => {
 
    resp.end();
})
