const pool = require('../db');

module.exports = {
  getAll: (count = 5) => {
    return (
      pool.query(`SELECT * FROM products LIMIT ${count}`)
      // pool.query(`SELECT * FROM products`)
        .then((res) => res.rows).catch(() => 'Not Found')
    );
  },
  getProduct: (product_id) => {
    return (
      // pool.query(`SELECT * FROM products WHERE id=${product_id}`)
      pool.query(`SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price,
      json_agg(json_build_object('feature', f.feature, 'value', f.value)) AS features
      FROM products p JOIN features f ON p.id = f.product_id
      WHERE p.id = ${product_id}
      GROUP by p.id`)
      .then((res) => res.rows).catch(() => 'Not Fount')
    );
  }
}