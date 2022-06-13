require('dotenv').config();
const express = require('express');

const router = require('./routes.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/products', router);
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

app.listen(PORT);

console.log(`Server listening at http://localhost:${PORT}`);

module.exports = app;