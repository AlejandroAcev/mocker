import mysql2 from 'mysql2/promise';



const handleQueryResult = (error: any, results: any, fields: any) => {
  if (error) {
    console.error('---> Error in the database request: ', error);
    return error;
  }

  console.log('Result: ', results);
  return results;
}

const executeQuery = async ({query, values}) => {
  const db = await mysql2.createConnection({
    host    : process.env.MYSQL_HOST,
    port    : parseInt(process.env.MYSQL_PORT) || 3306,
    database: process.env.MYSQL_DATABASE,
    user    : process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  });

  const [rows, fields] = await db.execute(query, values);
  return [rows, fields];
}

export default executeQuery;