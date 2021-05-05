import mysql from 'mysql';

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT) || 3306,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
});

db.connect();

const handleQueryResult = (error, results, fields) => {
  if (error) {
    console.error('---> Error in the database request: ', error);
    return error;
  }

  console.log('Result: ', results);
  return results;
}

const executeQuery = ({query, values}) => {
  const result = db.query(query, values, handleQueryResult);
  
  return result;
}

// db.end();

export default executeQuery;