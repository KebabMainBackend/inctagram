import TestAgent from 'supertest/lib/agent';

export const login = async (request: TestAgent<any>) => {
  return request
    .post('/auth/login')
    .set('User-Agent', 'default')
    .send({ email: 'example@gmail.com', password: 'Pa$$w0rD' });
};
