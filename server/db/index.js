const {Client} = require('pg');

const client = new Client({
  host: "localhost",
  user: "hang",
  database: "products",
  port:5432,
})

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
