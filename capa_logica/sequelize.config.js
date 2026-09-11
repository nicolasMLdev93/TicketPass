// sequelize.config.js
require('ts-node/register');
const config = require('./src/config/config.ts');
module.exports = config.default || config;