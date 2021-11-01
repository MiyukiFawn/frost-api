import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2';
import { param } from '../routes/sample';
import config from './config';

const params: mysql.PoolOptions = {
    user: config.mysql.user,
    password: config.mysql.password,
    host: config.mysql.host,
    database: config.mysql.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(params);

async function SelectQuery(query: string, params?: any[]) {
    return new Promise<RowDataPacket[]>((resolve, reject) => {
        pool.query(query, params, (err, rows: RowDataPacket[]) => {
            if (err) reject(err.message);
            resolve(rows);
        });
    });
}

async function InsertQuery(query: string, params?: any[]) {
    return new Promise<ResultSetHeader>((resolve, reject) => {
        pool.query(query, params, (err, rows: ResultSetHeader) => {
            if (err) reject(err.message);
            resolve(rows);
        });
    });
}

export default {
    SelectQuery,
    InsertQuery
};
