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
  },
  getStyles: (product_id) => (
    pool.query(
      `SELECT s.product_id AS product_id,
      json_agg(json_build_object(
          'style_id', s.id, 'name', s.name,'original_price', s.original_price,
          'sale_price', s.sale_price,'default?', s.default_style,
          'photos', (SELECT json_agg(json_build_object(
            'url', jpg.url, 'thumbnail_url', jpg.thumbnail_url))
          AS photos FROM photos jpg WHERE jpg.style_id = s.id
          GROUP BY jpg.style_id),
          'skus', (SELECT json_object_agg(sk.id::TEXT, json_build_object(
                'quantity', sk.quantity,
                'size', sk.size)) AS skus
            FROM skus sk WHERE sk.style_id = s.id
            GROUP BY sk.style_id
          )
        )
      ) AS results
      FROM styles s
      WHERE s.product_id = ${product_id}
      GROUP BY s.product_id`
    )
      .then((res) => {
        return res.rows[0];
      })
      .catch((err) => {
        console.log(err);
        return 'Not Found';
      })
  ),
  getRelated: (productId) => (
    pool.query(
      `SELECT
      json_agg(related_id)
      FROM related r
      WHERE r.product_id = ${productId}`,
    )
      .then((res) => res.rows[0].json_agg)
      .catch((err) => {
        console.log(err);
        return 'Not Found';
      })
  )
}
