const pool = require('../db');

module.exports = {
  getAll: (count = 5, page = 1) => {
    const skipPage = count * (page - 1);
    return (
      pool
        .query(`SELECT * FROM products ORDER BY id ASC LIMIT ${count} OFFSET ${skipPage}`)
        .then((res) => res.rows).catch(() => 'Not Found')
    );
  }
}