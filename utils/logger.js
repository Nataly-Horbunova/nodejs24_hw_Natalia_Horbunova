const { bgBlue, bgYellow, bgRed, disable } = require('colors/safe');
const config = require('config');
const fs = require ('fs');
const path = require('path');

const { colorsEnabled, logLevel } = config.logger;

function getCurrentDate() {
    return new Date().toISOString();
}

function shouldLog(...logLevels) {
    const currentlogLevel = logLevel;
    return logLevels.some(elem => elem === currentlogLevel);
}

function logToConsole(color, moduleName, ...args) { 
    console.log(color(`${moduleName}:`), ...args); 
}

function logToFile(streamName, moduleName, ...args) { 
    const formatedArgs = args.map(arg => typeof arg === "object" ? JSON.stringify(arg) : arg);
    streamName.write(`${getCurrentDate()} ${moduleName}: ${formatedArgs.join(' ')}\n`);
}

const logsDir = path.join('.', 'logs');
const infoFilePath = path.join(logsDir, 'info.log');
const errorsFilePath = path.join(logsDir, 'errors.log');

try {
    fs.accessSync(logsDir);
} catch (error) {
    if (error.code === 'ENOENT') {
        fs.mkdirSync(logsDir, { recursive: true });
    } else {
        console.log(`An error occured while trying to acces ${logsDir}: ${error.message}`);
    }
}

const infoWriteStream = fs.createWriteStream(infoFilePath, { flags: 'a'});
const errorsWriteStream = fs.createWriteStream(errorsFilePath, { flags: 'a'});

function logger (moduleName) {

    !colorsEnabled && disable();
    
    return {
        info: (...args) => {
            logToFile(infoWriteStream, moduleName, ...args);
            shouldLog('info') && logToConsole(bgBlue, moduleName, ...args);
        },
        warn: (...args) => {
            logToFile(errorsWriteStream, moduleName, ...args);
            shouldLog('info', 'warn') && logToConsole(bgYellow, moduleName, ...args);
        },
        error: (...args) => {
            logToFile(errorsWriteStream, moduleName, ...args);
            logToConsole(bgRed, moduleName, ...args);
        }
    }
}

process.on('beforeExit', () => {
    infoWriteStream.end();
    errorsWriteStream.end();
})

module.exports = logger;