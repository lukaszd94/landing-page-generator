import { config } from '../config/config.js';
import pg from 'pg';
export let dbPool: pg.Pool;
export class DbService {

  constructor() {
    // the pool will emit an error on behalf of any idle clients
    // it contains if a backend error or network partition happens
    dbPool.on('error', (err: Error) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    })
  }

  static configureDatabase(dbMode: 'remote' | 'localhost'): void {
    switch (dbMode) {
      case 'remote':
        dbPool = new pg.Pool(config.dbConfig.remote);
        console.log(`[SERVER]: Database connected to ${dbMode} db`);
        break;
      case 'localhost':
        dbPool = new pg.Pool(config.dbConfig.localhost);
        console.log(`[SERVER]: Database connected to ${dbMode} db`);
        break;
      default:
        dbPool = new pg.Pool(config.dbConfig.localhost);
        console.log(`[SERVER]: Database connected to remote db`);
        break;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async runQuery(query: string): Promise<any> {
    try {
      const data = await dbPool.query(query);
      return data.rows.map(row => this.convertSnakeCaseToCamelCase(row))
    }
    catch (err) {
      console.error(err);
      throw err;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async runFunction(funtionName: string, ...params: any): Promise<any> {
    const convertedParams = params.map((_param: object, index: number) => `$${index + 1}`).join(',');

    try {
      const data = await dbPool.query(`select * from ${funtionName}(${convertedParams})`, params);
      return data.rows.map(row => this.convertSnakeCaseToCamelCase(row));
    }
    catch (err) {
      console.error(err);
      throw err;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async runProcedure(funtionName: string, ...params: any): Promise<any> {
    const convertedParams = params.map((_param: object, index: number) => `$${index + 1}`).join(',');

    try {
      await dbPool.query(`call ${funtionName}(${convertedParams})`, params);
      return true;
    }
    catch (err) {
      console.error(err);
      throw err;
    }
  }

  // TODO it can be inefficient in some cases
  static convertSnakeCaseToCamelCase(snakeCasedObject: object) {
    const newObject = {};

    Object.keys(snakeCasedObject).forEach((key: string) => {
      const keyInCamelCase = key.replace(/([-_]\w)/g, g => g[1].toUpperCase());
      newObject[keyInCamelCase] = snakeCasedObject[key];
    });

    return newObject;
  }
}

