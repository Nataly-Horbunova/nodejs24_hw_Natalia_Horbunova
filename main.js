require('dotenv').config();
const fileSync = require('./file_sync');
const logger = require('./utils/logger')('main');

logger.info('The script is running!');
logger.warn('Warning message');
logger.error('An error orrcured', {reason: 'because'});

fileSync.start();


