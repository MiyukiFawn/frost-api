import mysql, { ResultSetHeader, RowDataPacket } from "mysql2";
import config from "config";

const params: mysql.PoolOptions = {
  user: config.mysql.user,
  password: config.mysql.password,
  host: config.mysql.host,
  database: config.mysql.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(params);

const rowDataQuery = async (query: string, params?: any[]) => {
  const result = new Promise<RowDataPacket[]>((resolve, reject) => {
    pool.query(query, params, (err, rows: RowDataPacket[]) => {
      if (err) reject(err.message);
      resolve(rows);
    });
  });

  return result;
}

const resultSetQuery = async (query:string, params?: any[]) => {
  const result = new Promise<ResultSetHeader>((resolve, reject) => {
    pool.query(query, params, (err, rows: ResultSetHeader) => {
      if (err) reject(err.message);
      resolve(rows);
    })
  });

  return result;
}

const db = {
  rowDataQuery,
  resultSetQuery
}

export default db;
