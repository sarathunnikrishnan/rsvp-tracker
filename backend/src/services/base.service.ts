import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { dbPool } from '../config/database.config';

/**
 * Reusable BaseService providing common parameterized database operations.
 */
export abstract class BaseService {
  protected pool: Pool = dbPool;

  protected async query<T extends RowDataPacket[]>(
    sql: string,
    params?: any[]
  ): Promise<T> {
    const [rows] = await this.pool.query<T>(sql, params);
    return rows;
  }

  protected async execute(
    sql: string,
    params?: any[]
  ): Promise<ResultSetHeader> {
    const [result] = await this.pool.execute<ResultSetHeader>(sql, params);
    return result;
  }
}
