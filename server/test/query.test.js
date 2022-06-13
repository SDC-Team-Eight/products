const app = require('../index');
const request = require('supertest');

describe('GET Questions Endpoint', () => {
  test('should respond with a 200 status code for products in the database', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
  });
})

// test('test', () => {
//   expect(1).toBe(1);
// })