import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { login } from '../../../test/managers/login';
import { AppModule } from '../../app.module';
import { appSettings } from '../../app.settings';
import { FilesModule } from '../../../../files/src/files.module';

// const URL = '/posts';
const timeout = 10000;
describe('AuthController', () => {
  let app: INestApplication;
  let httpServer;
  let accesstoken;
  let refreshToken;
  // let user: { id: number; email: string };
  // const imagesIds = ['65f56c5702f9adf761f516d1', '65f56c5702f9adf761f516d3'];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const microService = await Test.createTestingModule({
      imports: [FilesModule],
    }).compile();
    app = module.createNestApplication();

    appSettings(app);

    app.connectMicroservice(microService);
    await app.init();

    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('login', () => {
    jest.setTimeout(timeout);
    it('login user and get tokens', async () => {
      const data = await login(request(httpServer));
      accesstoken = data.body.accessToken;
      refreshToken = data.headers['set-cookie'][0];
    });
    it('should get current user from token', async () => {
      await request(httpServer)
        .get('/auth/me')
        .set('Authorization', 'Bearer ' + accesstoken)
        .set('Cookie', refreshToken)

        .expect(HttpStatus.OK);
    });
  });
  // describe('create posts with already created images', () => {
  //   it('should create 1 post', async () => {
  //     const imageData = await request(httpServer)
  //       .post(URL)
  //       .set('Authorization', 'Bearer ' + accesstoken)
  //       .send({
  //         description: 'cool story',
  //         images: imagesIds,
  //       })
  //       .expect(HttpStatus.CREATED);
  //     expect(imageData.body.ownerId).toBe(user.id);
  //   });
  // });
});
