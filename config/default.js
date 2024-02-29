const ALLOWED_TYPES = ['array', 'sqlite'];
const storageType = process.env.STORAGE_TYPE;

module.exports = {
    logger: {
        colorsEnabled: Number(process.env.COLORS_ENABLED) === 1,
        logLevel: process.env.LOG_LEVEL || 'warn'
    },
    server: {
        port: process.env.PORT || 3000
    },
    storage: {
        type: ALLOWED_TYPES.includes(storageType) ? storageType : ALLOWED_TYPES[0]
    }
}