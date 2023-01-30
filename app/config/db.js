require('dotenv').config();

module.exports = {
  development: {
    dialect: 'mysql',
    database: process.env['DB_NAME'] || 'dbname',
    username: process.env['DB_USERNAME'] || 'dbuser',
    password: process.env['DB_PASSWORD'] || 'dbpassword',
    host: process.env['DB_HOST'] || 'localhost',
    port: parseInt(process.env['DB_PORT'] || '3306'),
  },
  test: {
    dialect: 'mysql',
    database: process.env['DB_NAME'] || 'dbname',
    username: process.env['DB_USERNAME'] || 'dbuser',
    password: process.env['DB_PASSWORD'] || 'dbpassword',
    host: process.env['DB_HOST'] || 'localhost',
    port: parseInt(process.env['DB_PORT'] || '3306'),
  },
  production: {
    dialect: 'mysql',
    database: process.env['DB_NAME'],
    username: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    host: process.env['DB_HOST'],
    port: parseInt(process.env['DB_PORT']),
  }
}