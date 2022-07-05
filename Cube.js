const host     = process.env.CUBEJS_DB_HOST;
const port     = process.env.CUBEJS_DB_PORT;
const database = process.env.CUBEJS_DB_NAME;
const user     = process.env.CUBEJS_DB_USER;
const password = process.env.CUBEJS_DB_PASS;

const PostgresDriver = require('@cubejs-backend/postgres-driver');

module.exports = {
  driverFactory: ({ dataSource }) => {
    console.log(dataSource);

    if (dataSource === 'transactions') {
      console.log('TRANSACTIONS ACCESSED')
      return new PostgresDriver({
        database: database,
        host: host,
        user: user,
        password: password,
        port: port,
      })
    }
    throw new Error('No valid APP ID found in Security Context!');
  },
};