const path = require('path')

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'phpmyadmin',
    user: process.env.DB_USER || 'phpmyadmin',
    password: process.env.DB_PASS || 'password',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || '127.0.0.1',
      port: 3306
    }
  }
}