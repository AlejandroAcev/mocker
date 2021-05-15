import mysql2 from 'mysql2/promise';

const executeQuery = async <T>({query, values}) => {
  const db = await mysql2.createConnection({
    host    : process.env.MYSQL_HOST,
    port    : parseInt(process.env.MYSQL_PORT) || 3306,
    database: process.env.MYSQL_DATABASE,
    user    : process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  });

  const [rows] = await db.execute(query, values);
  await db.end();
  return rows;
}

export default executeQuery;
