import { Connection } from 'mongoose';
import { FileImageSchema } from '../db/schemas/file.schema';

export const filesProviders = [
  {
    provide: 'FILE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('FileImages', FileImageSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
