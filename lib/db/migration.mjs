import mysql2 from 'mysql2';
import migration from 'mysql-migrations';
import config from '../../next.config.js';

const connection = mysql2.createPool({
  host     : config.env.MYSQL_HOST,
  port     : parseInt(config.env.MYSQL_PORT) || 3306,
  user     : config.env.MYSQL_USER,
  password : config.env.MYSQL_PASSWORD,
  database : config.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

migration.init(connection, './migrations', () => console.log('Migrations completed!'));
