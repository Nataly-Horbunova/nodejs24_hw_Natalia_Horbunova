module.exports = {
    logger: {
        colorsEnabled: Number(process.env.COLORS_ENABLED) === 1,
        logLevel: process.env.LOG_LEVEL || 'warn'
    },
    server: {
        port: process.env.PORT || 3000
    }
}