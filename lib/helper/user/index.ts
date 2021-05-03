import excuteQuery from "../../db/db-connection";
import { User } from "../../models/user";

const findUser = async (email: string) => {
  try {
    const result = await excuteQuery({
        query: 'SELECT * FROM users WHERE email = ?',
        values: [ email ],
    });
    
    return result[0] || null;

  } catch (error) {
      console.log(error);
      return null;
  }
}

const insertUser = async (user: User) => {
  
  try {
    const result = await excuteQuery({
      query: 'INSERT INTO users (id, name, email, date_of_birth, role, account_id, total_endpoints_created, endpoints_active, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      values: [user.id, user.name, user.email, user.date_of_birth, user.role, user.account_id, user.total_endpoints_created, user.endpoints_active, user.created_at, user.updated_at]
    });
    
    return user;

  } catch (error) {
    console.log( error );
    return {error: 'ERROR AL INSERTAR EL USUARIO'};
  }
}

export {
  findUser,
  insertUser
}