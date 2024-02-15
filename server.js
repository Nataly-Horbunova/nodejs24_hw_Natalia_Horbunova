require('dotenv').config();
const http = require('http');
const logger = require('./utils/logger')('request');

const server = http.createServer();
const port = 3000;
server.listen(port);

function logRequest(req, resp) {
    const message = `${req.method} ${req.url} ${resp.statusCode}`;
    resp.statusCode === 200 && logger.info(message);
    resp.statusCode === 404 && logger.warn(message);
}

server.on('listening', () => logger.info(`Server is wating on [${port}] port`)); 

server.on('request', (req, resp) => {

    if (/^\/healthcheck$/.test(req.url) && req.method === 'GET') {
            resp.writeHead(200);
            resp.write('healthcheck passed');
    } else {
        resp.writeHead(404);
    }

    logRequest(req, resp);
    resp.end();
})
