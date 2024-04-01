import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { appSettings } from '../../app.settings';
import { INestApplication } from '@nestjs/common';
const timeout = 15000;

describe('ProfileController', () => {
  let app: INestApplication;
  let httpServer;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    appSettings(app);

    await app.init();

    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    jest.setTimeout(timeout);
    expect('2').toBe('2');
  });
});
