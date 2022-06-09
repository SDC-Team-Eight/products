CREATE TABLE IF NOT EXISTS product (
  id int,
  name varchar(80),
  slogan text,
  description text,
  category varchar(50),
  default_price varchar(20)
);

COPY product FROM
'/Users/hang/Desktop/Reactor Precourse/products/raw_data/product.csv'
DELIMITER ',' CSV HEADER;

CREATE TABLE related (
  id int,
  product_id int,
  related_id int,
  PRIMARY KEY(id),
  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (related_id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS features (
  feature_id int,
  product_id int,
  feature varchar(50),
  value varchar(255),
  PRIMARY KEY(feature_id),
  FOREIGN KEY(product_id) REFERENCES product(id)
);

COPY features FROM
'/Users/hang/Desktop/Reactor Precourse/products/raw_data/features.csv'
DELIMITER ',' CSV HEADER;

CREATE TABLE IF NOT EXISTS styles (
  style_id int,
  product_id int,
  name VARCHAR(255),
  sale_price VARCHAR(255),
  original_price INT,
  default_style int,
  FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS photos (
  id int,
  style_id int,
  url VARCHAR(255),
  thumbnail_url VARCHAR(255),
  PRIMARY KEY(id),
  FOREIGN KEY (style_id) REFERENCES styles(style_id)
);

