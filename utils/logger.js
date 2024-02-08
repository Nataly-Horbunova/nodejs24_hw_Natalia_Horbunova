const { bgBlue, bgYellow, bgRed, disable } = require('colors/safe');
const config = require('config');
const fs = require ('fs');
const path = require('path');

function shouldLog(...logLevels) {
    const currentlogLevel = config.logLevel;
    return logLevels.some(elem => elem === currentlogLevel);
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

const infoWriteStream = fs.createWriteStream(infoFilePath, { flags: 'a' });
const errorsWriteStream = fs.createWriteStream(errorsFilePath, { flags: 'a' });

function logger (moduleName) {
    !config.colorsEnabled && disable();

    return {
        info: (...args) => {
            infoWriteStream.write(`${moduleName}: ${args.join(' ')}\n`);

            if (shouldLog('info')) {
                console.log(bgBlue(`${moduleName}:`), ...args);
            }
        },
        warn: (...args) => {
            errorsWriteStream.write(`${moduleName}: ${args.join(' ')}\n`);

            if (shouldLog('info', 'warn')) {
                console.warn(bgYellow(`${moduleName}:`), ...args);
            }
        },
        error: (...args) => {
            errorsWriteStream.write(`${moduleName}: ${args.join(' ')}\n`);

            if(shouldLog('info', 'warn', 'error')) {
                console.error(bgRed(`${moduleName}:`), ...args);
            }
        }
    }
}

process.on('beforeExit', () => {
    infoWriteStream.end();
    errorsWriteStream.end();
})

module.exports = logger;