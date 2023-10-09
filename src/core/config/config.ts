import fs from 'fs';

const credentials = JSON.parse(fs.readFileSync('credentials.json').toString());
console.error('[SERVER]: Local credentials (credentials.json) loaded sucessfully!');
//console.error('Your local credentials: ', credentials);

export const config = {
  httpPort: 8081,
  dbConfig: {
    remote: {
      user: <string>credentials.pg.heroku.user,
      password: <string>credentials.pg.heroku.password,
      database: <string>credentials.pg.heroku.database,
      host:  <string>credentials.pg.heroku.host,
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
  },
  mailerConfig: {
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
      user: <string>credentials.mail.user,
      pass: <string>credentials.mail.password
    }
  },
  aws: {
    key: 'AKIARVUK52YK4ZO5TIHK',
    secretKey: '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'
  },
  jwtSecret: <string>credentials.jwt.secret,
  jwtResetPasswordSecret: <string>credentials.jwt.resetPasswordSecret,
  urlForPasswordReset: 'http://localhost:4200/#/auth/new-password'
}
