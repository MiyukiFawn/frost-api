import { DBUser, User } from "interfaces/user";
import db from "mysql";
import { ResultSetHeader } from "mysql2";

async function getAllUsers(): Promise<DBUser[]> {
  const result = await db.rowDataQuery(`SELECT * FROM user`);
  return result as DBUser[];
}

async function getSingleUser(id: number): Promise<DBUser> {
  const result = await db.rowDataQuery(`SELECT * FROM user WHERE id = ?`, [id]);
  return result[0] as DBUser;
}

async function getSingleUserFromUsername(username: string): Promise<DBUser> {
  const result = await db.rowDataQuery(`SELECT * FROM user WHERE username = ?`, [username]);
  return result[0] as DBUser;
}

async function insertUser(user: User): Promise<ResultSetHeader> {
  return db.resultSetQuery(`INSERT INTO user (username, email, password) VALUES (?, ?, ?)`, [
    user.username,
    user.email,
    user.password,
  ]);
}

async function updateUser(user: User, id: number): Promise<ResultSetHeader> {
  return db.resultSetQuery(`UPDATE user SET username = ?, email = ?, password = ? WHERE id = ?`, [
    user.username,
    user.email,
    user.password,
    id,
  ]);
}

async function deleteUser(id: number): Promise<ResultSetHeader> {
  return db.resultSetQuery(`DELETE FROM user WHERE id = ?`, [id]);
}

export default {
  getAllUsers,
  getSingleUser,
  getSingleUserFromUsername,
  insertUser,
  updateUser,
  deleteUser,
};
