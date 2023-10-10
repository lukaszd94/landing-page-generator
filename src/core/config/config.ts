import fs from 'fs';

const credentials = JSON.parse(fs.readFileSync('credentials.json').toString());
console.error('[SERVER]: Local credentials (credentials.json) loaded sucessfully!');
//console.error('Your local credentials: ', credentials);

export const config = {
  httpPort: 8081,
  dbConfig: {
    remote: {
      user: <string>credentials.pg.remote.user,
      password: <string>credentials.pg.remote.password,
      database: <string>credentials.pg.remote.database,
      host:  <string>credentials.pg.remote.host,
      port: 5432,
      ssl: {
        rejectUnauthorized: false
      }
    },
    localhost: {
      user: <string>credentials.pg.localhost.user,
      password: <string>credentials.pg.localhost.password,
      database: <string>credentials.pg.localhost.database,
      host: 'localhost',
      port: 5432
    }
  }
}
