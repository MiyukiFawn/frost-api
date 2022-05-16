import Test from "interfaces/test";
import db from "mysql";
import { ResultSetHeader } from "mysql2";

async function getAll(): Promise<Test[]> {
  const result = await db.rowDataQuery(`SELECT * FROM test`);
  return result as Test[];
}

async function getSingle(id: number): Promise<Test> {
  const result = await db.rowDataQuery(`SELECT * FROM test WHERE id = ?`, [id]);
  return result[0] as Test;
}

async function insert(test: Test): Promise<ResultSetHeader> {
  return db.resultSetQuery(`INSERT INTO test (text) VALUES (?)`, [test.text]);
}

async function update(test: Test): Promise<ResultSetHeader> {
  return db.resultSetQuery(`UPDATE test SET text = ? WHERE id = ?`, [test.text, test.id]);
}

async function remove(id: number): Promise<ResultSetHeader> {
  return db.resultSetQuery(`DELETE FROM test WHERE id = ?`, [id]);
}

export default {
  insert,
  getSingle,
  getAll,
  update,
  remove
};
