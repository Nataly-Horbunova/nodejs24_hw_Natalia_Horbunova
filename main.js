require('dotenv').config();
const logger = require('./utils/logger')('main');
const fileSync = require('./file_sync');

logger.info('the script is running!');
logger.warn('warning message', { contextId: 42});
logger.error(new Error('bad things happened', { cause: 'server broke a leg' }));

fileSync.start();


