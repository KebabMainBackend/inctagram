import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

describe('FilesController', () => {
  let filesController: FilesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [FilesService],
    }).compile();

    filesController = app.get<FilesController>(FilesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(filesController.getHello()).toBe('Hello World!');
    });
  });
});
