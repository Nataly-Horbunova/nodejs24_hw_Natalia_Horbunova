const {bgBlue, bgYellow, bgRed, disable} = require('colors/safe');
const config = require('config');

function shouldLog(...logLevels) {
    const currentlogLevel = config.logLevel;
    return logLevels.some(elem => elem === currentlogLevel);
}

function logger (moduleName) {
    !config.colorsEnabled && disable();

    return {
        info: (...args) => {
            if (shouldLog('info')) {
                console.log(bgBlue(`${moduleName}:`), ...args);
            }
        },
        warn: (...args) => {
            if (shouldLog('info', 'warn')) {
                console.warn(bgYellow(`${moduleName}:`), ...args);
            }
        },
        error: (...args) => {
            if(shouldLog('info', 'warn', 'error')) {
                console.error(bgRed(`${moduleName}:`), ...args);
            }
        }
    }
}

module.exports = logger;