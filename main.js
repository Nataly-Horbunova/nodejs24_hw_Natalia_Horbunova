require('dotenv').config();
const logger = require('./utils/logger')('main');

logger.info('the script is running!');
logger.warn('warning message', { contextId: 42});
logger.error(new Error('bad things happened', { cause: 'server broke a leg' }));


