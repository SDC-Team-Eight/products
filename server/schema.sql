-- DROP DATABASE IF EXISTS products;
--CREATE DATABASE products;

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price INT
);

\COPY products(id, name, slogan, description, category, default_price)
FROM '../raw_data/product.csv'
DELIMITER ',' CSV HEADER;

DROP TABLE IF EXISTS related CASCADE;
CREATE TABLE IF NOT EXISTS related (
  id INT PRIMARY KEY,
  product_id INT,
  related_id INT,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

\COPY related(id, product_id, related_id)
FROM '../raw_data/related.csv'
DELIMITER ',' CSV HEADER;

DROP TABLE IF EXISTS features CASCADE;
CREATE TABLE IF NOT EXISTS features (
  id INT PRIMARY KEY,
  product_id INT,
  feature TEXT,
  value TEXT,
  FOREIGN KEY(product_id) REFERENCES products(id)
);

\COPY features(id, product_id, feature, value)
FROM '../raw_data/features.csv'
DELIMITER ',' CSV HEADER;

DROP TABLE IF EXISTS styles CASCADE;
CREATE TABLE IF NOT EXISTS styles (
  id INT PRIMARY KEY,
  product_id INT,
  name TEXT,
  sale_price TEXT,
  original_price TEXT,
  default_style INT,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

\COPY styles(id, product_id, name, sale_price, original_price, default_style)
FROM'../raw_data/styles.csv'
DELIMITER ',' CSV HEADER;

DROP TABLE IF EXISTS photos CASCADE;
CREATE TABLE IF NOT EXISTS photos (
  id INT PRIMARY KEY,
  style_id INT,
  url TEXT,
  thumbnail_url TEXT,
  FOREIGN KEY (style_id) REFERENCES styles(id)
);

\COPY photos(id, style_id, url, thumbnail_url)
FROM'../raw_data/photos.csv'
DELIMITER ',' CSV HEADER;

DROP TABLE IF EXISTS skus CASCADE;
CREATE TABLE IF NOT EXISTS skus (
  id INT PRIMARY KEY,
  style_id INT,
  size TEXT,
  quantity INT,
  FOREIGN KEY (style_id) REFERENCES styles(id)
);

\COPY skus(id, style_id, size, quantity)
FROM'../raw_data/skus.csv'
DELIMITER ',' CSV HEADER;

DROP INDEX IF EXISTS featureProductIndex;
DROP INDEX IF EXISTS styleProductIndex;
DROP INDEX IF EXISTS skuStyleIndex;
DROP INDEX IF EXISTS photoStyleIndex;
DROP INDEX IF EXISTS relatedProductIndex;

CREATE INDEX featureProductIndex ON features(product_id);
CREATE INDEX styleProductIndex ON styles(product_id);
CREATE INDEX skuStyleIndex ON skus(style_id);
CREATE INDEX photoStyleIndex ON photos(style_id);
CREATE INDEX relatedProductIndex ON related(product_id);
