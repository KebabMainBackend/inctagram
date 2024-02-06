import * as process from 'process';
import { createWriteStream } from 'fs';
import { get } from 'http';

export function createStaticSwagger() {
  const env = process.env.NODE_ENV;
  const port = process.env.PORT;
  if (env === 'development') {
    const serverUrl = `http://localhost:${port}`;
    get(`${serverUrl}/swagger/swagger-ui-bundle.js`, function (response) {
      response.pipe(
        createWriteStream('apps/inctagram/swagger-static/swagger-ui-bundle.js'),
      );
    });

    get(`${serverUrl}/swagger/swagger-ui-init.js`, function (response) {
      response.pipe(
        createWriteStream('apps/inctagram/swagger-static/swagger-ui-init.js'),
      );
    });

    get(
      `${serverUrl}/swagger/swagger-ui-standalone-preset.js`,
      function (response) {
        response.pipe(
          createWriteStream(
            'apps/inctagram/swagger-static/swagger-ui-standalone-preset.js',
          ),
        );
      },
    );

    get(`${serverUrl}/swagger/swagger-ui.css`, function (response) {
      response.pipe(
        createWriteStream('apps/inctagram/swagger-static/swagger-ui.css'),
      );
    });
  }
}
