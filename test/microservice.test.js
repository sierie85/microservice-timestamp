const app = require('../app');
const request = require('supertest');

describe('Test invalid date and timestamp', () => {

  const result = JSON.stringify({
    "unix": null,
    "natural": null
  });

  test('2011-25-35', async () => {
    const response = await request(app).get('/2011-25-35');
    expect(response.text).toBe(result);
  });

  test('100000000', async () => {
    const response = await request(app).get('/100000000');
    expect(response.text).toBe(result);
  });

});

describe('Test parameter given timestamp', () => {

  const result = JSON.stringify({
    "unix": null,
    "natural": null
  });

  test('496540800', async () => {
    const response = await request(app).get('/496540800');
    expect(response.text).toBe(result);
  });

});

describe('Test diffrent date formats', () => {

  const result = JSON.stringify({
    "unix": 496540800,
    "natural": "September 26, 1985"
  });

  test('yyyy-mm-dd', async () => {
    const response = await request(app).get('/1985-09-26');
    expect(response.text).toBe(result);
  });

  test('September 26, 1985', async () => {
    const response = await request(app).get('/September%2026,1985');
    expect(response.text).toBe(result);
  });

  test('yyyy.mm.dd', async () => {
    const response = await request(app).get('/1985.09.26');
    expect(response.text).toBe(result);
  });

  test('1985, September 26', async () => {
    const response = await request(app).get('/1985,%20September%2026');
    expect(response.text).toBe(result);
  });

});
