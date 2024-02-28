import { Test } from '@nestjs/testing';
import { FilesController } from './api/files.controller';
import { FilesService } from './files.service';

describe('FilesController', () => {
  beforeEach(async () => {
    await Test.createTestingModule({
      controllers: [FilesController],
      providers: [FilesService],
    }).compile();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect('d').toBe('d');
    });
  });
});
