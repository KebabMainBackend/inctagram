import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { appSettings } from '../app.settings';
import * as request from 'supertest';

const URL = '/auth';
const userBody = {
  username: 'sansrona',
  password: 'Pa$$w0rd',
  email: 'zhumamedin@gmail.com',
};
const timeout = 10000;
describe('AuthController', () => {
  let app: INestApplication;
  let httpServer;
  let refreshToken: string;
  let newRefreshToken: string;
  let accesstoken;
  const data = {
    email: 'zhumamedin@gmail.com',
    password: 'Pa$$w0rd',
  };

  const UA1 =
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    appSettings(app);

    await app.init();

    httpServer = app.getHttpServer();

    await request(httpServer).delete(URL + '/delete-me');
  });

  afterAll(async () => {
    await app.close();
  });

  const login = async (
    data: { email: string; password: string },
    userAgent: string,
  ) => {
    return request(httpServer)
      .post('/auth/login')
      .set('User-Agent', userAgent)
      .send({ email: data.email, password: data.password });
  };

  describe('registration', () => {
    jest.setTimeout(timeout);
    it('should create user and return 204', async () => {
      await request(httpServer)
        .post(URL + '/registration')
        .send(userBody)
        .expect(HttpStatus.NO_CONTENT);
    });
    it('should return 404 on invalid input data', async () => {
      const errorBody = await request(httpServer)
        .post(URL + '/registration')
        .send({
          email: 'wrong email',
          password: '1234',
          login: 'log',
        })
        .expect(HttpStatus.BAD_REQUEST);
      expect(errorBody.body.errorsMessages.length).toBe(3);
    });
    it('should return 429 on too many requests', async () => {
      await request(httpServer)
        .post(URL + '/registration')
        .send({
          email: 'wrong email',
          password: '1234',
          login: 'log',
        })
        .expect(HttpStatus.BAD_REQUEST);
      await request(httpServer)
        .post(URL + '/registration')
        .send({
          email: 'wrong email',
          password: '1234',
          login: 'log',
        })
        .expect(HttpStatus.BAD_REQUEST);
      await request(httpServer)
        .post(URL + '/registration')
        .send({
          email: 'wrong email',
          password: '1234',
          login: 'log',
        })
        .expect(HttpStatus.BAD_REQUEST);
      await request(httpServer)
        .post(URL + '/registration')
        .send({
          email: 'wrong email',
          password: '1234',
          login: 'log',
        })
        .expect(HttpStatus.TOO_MANY_REQUESTS);
      await request(httpServer)
        .post(URL + '/registration')
        .send({
          email: 'wrong email',
          password: '1234',
          login: 'log',
        })
        .expect(HttpStatus.TOO_MANY_REQUESTS);
    });
  });
  describe('login', () => {
    it('should return error when email is not confirmed', async () => {
      await request(httpServer)
        .post(URL + '/login')
        .send(data)
        .expect(HttpStatus.UNAUTHORIZED);
    });
    it('should return token when login with default acc', async () => {
      const token = await request(httpServer)
        .post(URL + '/login')
        .send({ email: 'example@gmail.com', password: 'Pa$$w0rd' })
        .expect(HttpStatus.OK);
      accesstoken = token.body.accessToken;
      refreshToken = token.headers['set-cookie'][0];
      //   .find((cookie: string) =>
      //   cookie.startsWith('refreshToken='),
      // );
      expect(token.body.accessToken).toEqual(expect.any(String));
    });
    it('should return error with incorrect data', async () => {
      await request(httpServer)
        .post(URL + '/login')
        .send({ email: 'example@gmail.com', password: 'Pa$$w0rd1' })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
  describe('logout', () => {
    it('should successfully logout user', async () => {
      await request(httpServer)
        .post(URL + '/logout')
        .set('Cookie', refreshToken)
        .expect(HttpStatus.NO_CONTENT);
    });
  });
});
