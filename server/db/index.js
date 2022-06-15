const {Pool} = require('pg');

const pool = new Pool({
  host: '18.212.58.25',
  user: 'test_user',
  database: 'products',
  port:5432,
  password: 'testpassword'
  // host: "localhost",
  // user: "hang",
  // database: "products",
  // port:5432,
});

pool.connect()
  .then(() => console.log('Database is connected!'))
  .catch((err) => console.log('err', err));

module.exports = pool;