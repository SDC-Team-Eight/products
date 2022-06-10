const {Pool} = require('pg');

const pool = new Pool({
  host: "localhost",
  user: "hang",
  database: "products",
  port:5432,
})

pool.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = pool;