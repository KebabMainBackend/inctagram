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
const timeout = 15000;
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
      .send({ loginOrEmail: data.email, password: data.password });
  };

  describe('registration', () => {
    it('should create user and return 204', async () => {
      const req = await request(httpServer)
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
  // describe('refresh token', () => {
  //   it(
  //     'should return new access token',
  //     async () => {
  //       const newAccessReq = await request(httpServer)
  //         .post(authURL + '/refresh-token')
  //         .set('Cookie', refreshToken)
  //         .expect(HttpStatus.OK);
  //       accesstoken = newAccessReq.body.accessToken;
  //       newRefreshToken = newAccessReq.headers['set-cookie'].find(
  //         (cookie: string) => cookie.startsWith('refreshToken='),
  //       );
  //     },
  //     timeout,
  //   );
  //   it(
  //     'should return error with invalid refresh token',
  //     async () => {
  //       await request(httpServer)
  //         .post(authURL + '/refresh-token')
  //         .set('Cookie', refreshToken)
  //         .expect(HttpStatus.UNAUTHORIZED);
  //     },
  //     timeout,
  //   );
  // });
  // describe('check logout', () => {
  //   it('should return error on  expired token', async () => {
  //     await request(httpServer)
  //       .post(authURL + '/logout')
  //       .set('Cookie', refreshToken)
  //       .expect(HttpStatus.UNAUTHORIZED);
  //   });
  //   it('should return 204 on valid token', async () => {
  //     await request(httpServer)
  //       .post(authURL + '/logout')
  //       .set('Cookie', newRefreshToken)
  //       .expect(HttpStatus.NO_CONTENT);
  //   });
  //   it('should return error on expired token 2', async () => {
  //     await request(httpServer)
  //       .post(authURL + '/logout')
  //       .set('Cookie', refreshToken)
  //       .expect(HttpStatus.UNAUTHORIZED);
  //   });
  // });
});
// accesstoken = await login(data, UA1);
// refreshToken = accesstoken.headers['set-cookie'].find(
//   (cookie: string) => cookie.startsWith('refreshToken='),
// );
