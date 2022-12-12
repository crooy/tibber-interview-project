import { Pool } from 'pg';
import { CleaningBotNewRecord, CleaningBotRecord } from './CleaningBotLogTable.types';

const pool = new Pool();

export default async function insertRecord(values: CleaningBotNewRecord): Promise<CleaningBotRecord> {
  const query = {
    text: 'INSERT INTO cleaning_bot_log (commands, result, duration) VALUES ($1, $2, $3) RETURNING *',
    values: [values.commands, values.result, values.duration],
  };
  const result = await pool.query(query.text, query.values);
  return result.rows[0];
}
