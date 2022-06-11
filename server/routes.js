const router = require('express').Router();
const {
  allProducts,
  product,
  styles,
  related
} = require('./controller');

router.get('/', allProducts);

router.get('/:product_id', product);

// router.get('/:product_id/styles', styles);

// router.get('/:product_id/related', related);

module.exports = router;