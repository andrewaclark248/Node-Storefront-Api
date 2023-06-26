import app from './../src/server';
import supertest from 'supertest';

const request = supertest(app);

describe('test endpoint response', () => {
  it('returns file not exists error', async () => {
    const response = await request.get(
      '/api/images?filename=invalidfilename&width=200&height=200'
    );
    expect(response.status).toBe(200);
    expect(response.text).toBe('please provide a filename; not provided');
  });


});