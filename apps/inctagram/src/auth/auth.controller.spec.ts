import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { appSettings } from '../app.settings';
import * as request from 'supertest';

const URL = '/auth';
const userBody = {
  username: 'default',
  password: 'Pa$$w0rd',
  email: 'default@gmail.com',
};
const timeout = 15000;
describe('AuthController', () => {
  let app: INestApplication;
  let httpServer;
  let refreshToken: string;
  let newRefreshToken: string;
  let accesstoken;
  let newAccessToken;
  const data = {
    email: 'default@gmail.com',
    password: 'Pa$$w0rD',
  };

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

  describe('registration', () => {
    jest.setTimeout(timeout);
    it('should create user and return 204', async () => {
      await request(httpServer)
        .post(URL + '/registration')
        .send(userBody)
        .expect(HttpStatus.OK, {
          email: 'default@gmail.com',
        });
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
      expect(errorBody.body.errorDescription.length).toBe(3);
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
        .expect(HttpStatus.BAD_REQUEST);
    });
    it('should return token when login with default acc', async () => {
      const token = await request(httpServer)
        .post(URL + '/login')
        .send({ email: 'example@gmail.com', password: 'Pa$$w0rD' })
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
        .expect(HttpStatus.BAD_REQUEST);
    });
    it('should return info about token owner', async () => {
      await request(httpServer)
        .get(URL + '/me')
        .auth(accesstoken, { type: 'bearer' })
        .expect(HttpStatus.OK);
    });
  });
  describe('logout', () => {
    it('should return error on logged out refreshToken', async () => {
      await request(httpServer)
        .post(URL + '/logout')
        .set('Cookie', refreshToken)
        .expect(HttpStatus.NO_CONTENT);
    });
  });
  describe('update-token', () => {
    it('should return new token after login', async () => {
      const token = await request(httpServer)
        .post(URL + '/login')
        .send({ email: 'example@gmail.com', password: 'Pa$$w0rD' })
        .expect(HttpStatus.OK);
      accesstoken = token.body.accessToken;
      refreshToken = token.headers['set-cookie'][0];
    });
    it('should return new tokens after update', async () => {
      const token = await request(httpServer)
        .post(URL + '/update-token')
        .set('Cookie', refreshToken)
        .expect(HttpStatus.OK);
      newAccessToken = token.body.accessToken;
      newRefreshToken = token.headers['set-cookie'][0];
      //   .find((cookie: string) =>
      //   cookie.startsWith('refreshToken='),
      // );
      expect(token.body.accessToken).toEqual(expect.any(String));
    });
    it('should return error on old refresh token', async () => {
      await request(httpServer)
        .post(URL + '/logout')
        .set('Cookie', refreshToken)
        .expect(HttpStatus.UNAUTHORIZED);
    });
    // it('should return error on old refresh token', async () => {
    //   await request(httpServer)
    //     .post(URL + '/logout')
    //     .set('Cookie', newRefreshToken)
    //     .expect(HttpStatus.NO_CONTENT);
    // });
  });
});
