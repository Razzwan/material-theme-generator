const ENV = process.env.FILE_NAME || process.env.NODE_ENV || 'development'

module.exports = require(`./webpack/${ENV}.js`)
