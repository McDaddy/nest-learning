import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as fs from 'fs';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const httpsOptions = {
    cert: fs.readFileSync(path.resolve(__dirname, './secrets/server.crt')),
    key: fs.readFileSync(path.resolve(__dirname, './secrets/server.key')),
  };
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });
  app.enableCors();
  app.useStaticAssets('static', { prefix: '/pages' });

  app.use(
    session({
      cookie: {
        maxAge: 1000 * 60 * 24 * 60, // 单位毫秒
      },
      secret: 'mcdaddy',
      resave: false, // resave 为 true 是每次访问都会更新 session，不管有没有修改 session 的内容，而 false 是只有 session 内容变了才会去更新 session。
      saveUninitialized: false, // saveUninitalized 设置为 true 是不管是否设置 session，都会初始化一个空的 session 对象。比如你没有登录的时候，也会初始化一个 session 对象，这个设置为 false 就好。
    }),
  );
  await app.listen(3000);
}
bootstrap();
