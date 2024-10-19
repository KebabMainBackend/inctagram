import { HttpExceptionFilter } from '../../../modules/filters/http-exception.filter';
import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '../../../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UsersRepository } from '../../../auth/db/users.repository';
import * as path from 'path';
import * as fs from 'fs';

interface userDataType {
  id: number;
  token: string | null;
  username: string;
  email: string;
  password: string;
}

describe('Messenger Controller', () => {
  let app: INestApplication;

  let usersRepository: UsersRepository;

  const firstUserData: userDataType = {
    id: 0,
    token: null,
    username: 'Julija',
    email: 'email1@gmail.com',
    password: 'Pas1ff445555!',
  };
  const secondUserData: userDataType = {
    id: 0,
    token: null,
    username: 'Andrey',
    email: 'email2@gmail.com',
    password: 'Pas1ff445555!',
  };
  const thirdUserData: userDataType = {
    id: 0,
    token: null,
    username: 'Krilova',
    email: 'email3@gmail.com',
    password: 'Pas1ff445555!',
  };
  const fourUserData: userDataType = {
    id: 0,
    token: null,
    username: 'Krisyukov',
    email: 'email4@gmail.com',
    password: 'Pas1ff445555!',
  };
  const fiveUserData: userDataType = {
    id: 0,
    token: null,
    username: 'Anatoliy',
    email: 'email5@gmail.com',
    password: 'Pas1ff445555!',
  };

  const textMessageForSecondUser = 'Здарова чо как';
  const textMessageForThirdUser = 'Кхе';
  const textMessageForFourUser = 'Пр кд чд';

  const textMessagesForFirstUser = ['Здарова', 'Всё супер'];

  let chatWithSecondUserId = 0;
  const allChatsIds: number[] = [];

  const createMessageRequestDto = (
    message: string = null,
    img: string = null,
    voice: string = null,
  ) => {
    return { message, img, voice };
  };

  const sendMessageRequest = async (recipientId, senderToken, message) => {
    await request(app.getHttpServer())
      .post(sendMessagePath(recipientId))
      .send(message)
      .set('Authorization', `Bearer ${senderToken}`)
      .expect(500);
  };

  const registrationPath = '/auth/registration';
  const loginPath = '/auth/login';
  const getAllChatsPath = `/messenger/chats`;
  const getOneChatPath = (chatId) => `/messenger/chats/${chatId}`;
  const sendMessagePath = (recipientId) =>
    `/messenger/send-message/${recipientId}`;

  const eightAndNineStepsResponseBody = (fiveUserId, secondUserId) => {
    return [
      {
        chatId: expect.any(Number),
        companion: {
          id: fiveUserId,
          username: fiveUserData.username,
        },
        message: {
          createdAt: expect.any(String),
          textMessage: null,
          voiceUrl: null,
          imgUrl: expect.stringContaining('.webp'),
          username: fiveUserData.username,
        },
      },
      {
        chatId: expect.any(Number),
        companion: {
          id: secondUserId,
          username: secondUserData.username,
        },
        message: {
          createdAt: expect.any(String),
          textMessage: null,
          voiceUrl: expect.stringContaining('.ogg'),
          imgUrl: null,
          username: firstUserData.username,
        },
      },
    ];
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [JwtService, ConfigService],
    }).compile();

    app = module.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors) => {
          const errorsForRes = [];
          errors.forEach((e) => {
            const zeroKey = Object.keys(e.constraints!)[0];
            errorsForRes.push({
              field: e.property,
              message: e.constraints![zeroKey],
            });
          });
          throw new BadRequestException(errorsForRes);
        },
      }),
    );

    app.useGlobalFilters(new HttpExceptionFilter());

    await app.init();

    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  afterAll(async () => {
    await app.close();
  });

  describe(
    'Тестирование ' +
      '1 - создания чатов, ' +
      '2 - отправления текстовых сообщений, аудио и файлов, ' +
      '3 - получения списка чатов и фильтрация их по username',
    () => {
      jest.setTimeout(300000);
      describe('Создание, подтверждение и логин 5 пользователей', () => {
        it('/Registration', async () => {
          const RegRequest = async (email, password, username) => {
            await request(app.getHttpServer())
              .post(registrationPath)
              .send({ email, password, username })
              .expect(200);
          };

          await RegRequest(
            firstUserData.email,
            firstUserData.password,
            firstUserData.username,
          );
          await RegRequest(
            secondUserData.email,
            secondUserData.password,
            secondUserData.username,
          );
          await RegRequest(
            thirdUserData.email,
            thirdUserData.password,
            thirdUserData.username,
          );
          await RegRequest(
            fourUserData.email,
            fourUserData.password,
            fourUserData.username,
          );
          await RegRequest(
            fiveUserData.email,
            fiveUserData.password,
            fiveUserData.username,
          );
        });
        it('/Confirmation', async () => {
          await usersRepository.updateUsersConfirmationStatusByEmail(
            firstUserData.email,
          );
          await usersRepository.updateUsersConfirmationStatusByEmail(
            secondUserData.email,
          );
          await usersRepository.updateUsersConfirmationStatusByEmail(
            thirdUserData.email,
          );
          await usersRepository.updateUsersConfirmationStatusByEmail(
            fourUserData.email,
          );
          await usersRepository.updateUsersConfirmationStatusByEmail(
            fiveUserData.email,
          );
        });
        it('/Login', async () => {
          const loginRequest = async (email, password) => {
            const response = await request(app.getHttpServer())
              .post(loginPath)
              .send({ email, password })
              .expect(200);

            expect(response.body).toEqual({
              accessToken: expect.any(String),
              userId: expect.any(Number),
            });

            return {
              id: response.body.userId,
              token: response.body.accessToken,
            };
          };

          const firstResponse = await loginRequest(
            firstUserData.email,
            firstUserData.password,
          );
          firstUserData.id = firstResponse.id;
          firstUserData.token = firstResponse.token;

          const secondResponse = await loginRequest(
            secondUserData.email,
            secondUserData.password,
          );
          secondUserData.id = secondResponse.id;
          secondUserData.token = secondResponse.token;

          const thirdResponse = await loginRequest(
            thirdUserData.email,
            thirdUserData.password,
          );
          thirdUserData.id = thirdResponse.id;
          thirdUserData.token = thirdResponse.token;

          const fourResponse = await loginRequest(
            fourUserData.email,
            fourUserData.password,
          );
          fourUserData.id = fourResponse.id;
          fourUserData.token = fourResponse.token;

          const fiveResponse = await loginRequest(
            fiveUserData.email,
            fiveUserData.password,
          );
          fiveUserData.id = fiveResponse.id;
          fiveUserData.token = fiveResponse.token;
          console.log(fiveResponse, 'FIVE R');
          console.log(
            firstUserData,
            secondUserData,
            thirdUserData,
            fourUserData,
            fiveUserData,
          );
        });
      });

      describe(
        'Первый сценарий (Валидация)- ' +
          '1. Первый пытается отправить пустое сообщение второму пользователю,' +
          '2. Первый пытается отправить третьему пользователю картинку 1+мб,' +
          '3. Первый пытается отправить четвёртому пользователю голосовое 3+мб, ' +
          '4. Создаётся чат между 5 и 4 пользователями и 2 пользователь пытается получить к нему доступ',
        () => {
          it('Первый пытается отправить пустое сообщение второму пользователю', async () => {
            const response = await request(app.getHttpServer())
              .post(sendMessagePath(secondUserData.id))
              .send({ message: '' })
              .set('Authorization', `Bearer ${firstUserData.token}`)
              .expect(400);
            expect(response.body.errorDescription).toEqual([
              {
                message:
                  'Message should not be an empty string or contain only spaces',
                field: 'message',
              },
            ]);
            console.log(response.body);
          });
          it('Первый пытается отправить третьему пользователю картинку 1+мб', async () => {
            const imagePath = path.join(
              __dirname,
              './images',
              'too-big-image.jpeg',
            );
            const buffer = fs.readFileSync(imagePath);

            const response = await request(app.getHttpServer())
              .post(sendMessagePath(thirdUserData.id))
              .attach('image', buffer, 'too-big-image.jpeg')
              .set('Authorization', `Bearer ${firstUserData.token}`)
              .expect(400);

            expect(response.body.message).toEqual(
              'File size exceeds the limit of 1 MB',
            );

            console.log(response.body);
          });
          it('Первый пытается отправить четвёртому пользователю голосовое 3+мб', async () => {
            const voicePath = path.join(
              __dirname,
              './audio',
              'too-big-voice.m4a',
            );
            const voiceBuffer = fs.readFileSync(voicePath);

            const response = await request(app.getHttpServer())
              .post(`/messenger/send-voice/${fourUserData.id}`)
              .attach('voice', voiceBuffer, 'too-big-voice.m4a')
              .set('Authorization', `Bearer ${firstUserData.token}`)
              .expect(400);

            expect(response.body.message).toEqual(
              'File size exceeds the limit of 3 MB',
            );
            console.log(response.body);
          });
          it('Создаётся чат между 5 и 4 пользователями и 2 пользователь пытается получить к нему доступ', async () => {
            await sendMessageRequest(
              fourUserData.id,
              fiveUserData.token,
              createMessageRequestDto('Тест00'),
            );

            const allChatsResponse = await request(app.getHttpServer())
              .get(getAllChatsPath)
              .set('Authorization', `Bearer ${fiveUserData.token}`)
              .expect(200);
            console.log(allChatsResponse.body);
            const currentChatId = allChatsResponse.body[0].chatId;

            const currentChatResponse = await request(app.getHttpServer())
              .get(getOneChatPath(currentChatId))
              .set('Authorization', `Bearer ${secondUserData.token}`)
              .expect(403);
            console.log(currentChatResponse.body);
            // expect(response.body).toEqual();
          });
        },
      );

      describe(
        'Второй Сценарий - ' +
          '1. Первый не имеет ни одного чата и хочет отправить текстовое сообщение второму, третьему и четвёртому,' +
          '2. Отправив сообщения первый запрашивает все чаты и должен получить их в порядке 4, 3, 2' +
          '3. Второй увидев сообщение первого отвечает ему двумя,' +
          '4. Первый запрашивает список всех чатов и ожидается что порядок чатов будет 2, 4, 3, а в чате со вторым будет отображаться последнее сообщение второго,' +
          '5. Первый открывает чат со вторым и должен увидеть все сообщения в порядке "новые снизу"' +
          '6. Первый отвечает второму картинкой и голосовым, ' +
          '7. Пятый отправляет картинку первому, ' +
          '8. Первый запрашивает чаты и их порядок должен быть 5, 2, 4, 3, при этом во втором чате последнее сообщение должно быть voiceUrl, а в пятом imgUrl,' +
          '9. Первый вводит в строке поиска username "an" и должен получить чат со вторым и пятым пользователем по частичному совпадению username без учёта регистра,' +
          '10. Первый отвечает второму голосовым в формате mp4 (m4a),' +
          '11. Первый запрашивает чат со вторым и его последнее сообщение должно содержать ссылку на аудио в формате mp4',
        () => {
          describe('Шаги 1 и 2 - Первый пользователь отправляет сообщения и запрашивает чаты', () => {
            it('/Send Message Первый пользователь отправляет сообщения второму, третьему и четвёртому', async () => {
              await sendMessageRequest(
                secondUserData.id,
                firstUserData.token,
                createMessageRequestDto(textMessageForSecondUser),
              );

              await sendMessageRequest(
                thirdUserData.id,
                firstUserData.token,
                createMessageRequestDto(textMessageForThirdUser),
              );

              await sendMessageRequest(
                fourUserData.id,
                firstUserData.token,
                createMessageRequestDto(textMessageForFourUser),
              );
            });
            it('/Get чатов для первого пользователя, ожидается порядок 4, 3, 2', async () => {
              const response = await request(app.getHttpServer())
                .get(getAllChatsPath)
                .set('Authorization', `Bearer ${firstUserData.token}`)
                .expect(200);

              expect(response.body).toEqual([
                {
                  chatId: expect.any(Number),
                  companion: {
                    id: fourUserData.id,
                    username: fourUserData.username,
                  },
                  message: {
                    createdAt: expect.any(String),
                    textMessage: textMessageForFourUser,
                    voiceUrl: null,
                    imgUrl: null,
                    username: firstUserData.username,
                  },
                },
                {
                  chatId: expect.any(Number),
                  companion: {
                    id: thirdUserData.id,
                    username: thirdUserData.username,
                  },
                  message: {
                    createdAt: expect.any(String),
                    textMessage: textMessageForThirdUser,
                    voiceUrl: null,
                    imgUrl: null,
                    username: firstUserData.username,
                  },
                },
                {
                  chatId: expect.any(Number),
                  companion: {
                    id: secondUserData.id,
                    username: secondUserData.username,
                  },
                  message: {
                    createdAt: expect.any(String),
                    textMessage: textMessageForSecondUser,
                    voiceUrl: null,
                    imgUrl: null,
                    username: firstUserData.username,
                  },
                },
              ]);

              response.body.map((chat) => allChatsIds.push(chat.chatId));
            });
          });
          describe('Шаги 3, 4 и 5 - Второй пользователь отвечает на сообщения, после чего первый запрашивает все чаты и переходит к чату только со вторым', () => {
            it('/Send Message', async () => {
              await sendMessageRequest(
                firstUserData.id,
                secondUserData.token,
                createMessageRequestDto(textMessagesForFirstUser[0]),
              );
              await sendMessageRequest(
                firstUserData.id,
                secondUserData.token,
                createMessageRequestDto(textMessagesForFirstUser[1]),
              );
            });
            it('/Get чатов для первого пользователя, ожидается порядок 2, 4, 3', async () => {
              const response = await request(app.getHttpServer())
                .get(getAllChatsPath)
                .set('Authorization', `Bearer ${firstUserData.token}`)
                .expect(200);
              console.log(response.body);

              expect(response.body).toEqual([
                {
                  chatId: expect.any(Number),
                  companion: {
                    id: secondUserData.id,
                    username: secondUserData.username,
                  },
                  message: {
                    createdAt: expect.any(String),
                    textMessage: textMessagesForFirstUser[1],
                    voiceUrl: null,
                    imgUrl: null,
                    username: secondUserData.username,
                  },
                },
                {
                  chatId: expect.any(Number),
                  companion: {
                    id: fourUserData.id,
                    username: fourUserData.username,
                  },
                  message: {
                    createdAt: expect.any(String),
                    textMessage: textMessageForFourUser,
                    voiceUrl: null,
                    imgUrl: null,
                    username: firstUserData.username,
                  },
                },
                {
                  chatId: expect.any(Number),
                  companion: {
                    id: thirdUserData.id,
                    username: thirdUserData.username,
                  },
                  message: {
                    createdAt: expect.any(String),
                    textMessage: textMessageForThirdUser,
                    voiceUrl: null,
                    imgUrl: null,
                    username: firstUserData.username,
                  },
                },
              ]);

              chatWithSecondUserId = response.body[0].chatId;
              console.log(chatWithSecondUserId);
            });
            it('/Get Current Chat первый пользователь запрашивает чат со вторым', async () => {
              const response = await request(app.getHttpServer())
                .get(getOneChatPath(chatWithSecondUserId))
                .set('Authorization', `Bearer ${firstUserData.token}`)
                .expect(200);

              expect(response.body).toEqual({
                chatId: chatWithSecondUserId,
                members: expect.arrayContaining([
                  {
                    userId: secondUserData.id,
                    username: secondUserData.username,
                  },
                  {
                    userId: firstUserData.id,
                    username: firstUserData.username,
                  },
                ]),
                messages: [
                  {
                    id: expect.any(Number),
                    userId: firstUserData.id,
                    message: textMessageForSecondUser,
                    imgUrl: null,
                    voiceUrl: null,
                    createdAt: expect.any(String),
                  },
                  {
                    id: expect.any(Number),
                    userId: secondUserData.id,
                    message: textMessagesForFirstUser[0],
                    imgUrl: null,
                    voiceUrl: null,
                    createdAt: expect.any(String),
                  },
                  {
                    id: expect.any(Number),
                    userId: secondUserData.id,
                    message: textMessagesForFirstUser[1],
                    imgUrl: null,
                    voiceUrl: null,
                    createdAt: expect.any(String),
                  },
                ],
              });
            });
          });
          describe('Шаги 6, 7, 8 и 9 - Отправление картинок и голосовых и фильтрация чатов по username', () => {
            it('Шаг 6 и 7 - Первый отправляет картинку и голосовое второму и пятый отправляет картинку первому ', async () => {
              const imageJpegPath = path.join(
                __dirname,
                './images',
                'image-jpeg.jpg',
              );
              const imageJpegBuffer = fs.readFileSync(imageJpegPath);

              await request(app.getHttpServer())
                .post(sendMessagePath(secondUserData.id))
                .attach('image', imageJpegBuffer, 'image-jpeg.jpg')
                .set('Authorization', `Bearer ${firstUserData.token}`)
                .expect(500);
              const voicePath = path.join(
                __dirname,
                './audio',
                'voice-ogg.ogg',
              );
              const voiceBuffer = fs.readFileSync(voicePath);

              await request(app.getHttpServer())
                .post(`/messenger/send-voice/${secondUserData.id}`)
                .attach('voice', voiceBuffer, 'voice-ogg.ogg')
                .set('Authorization', `Bearer ${firstUserData.token}`)
                .expect(500);

              const imagePngPath = path.join(
                __dirname,
                './images',
                'image-png.png',
              );
              const imagePngBuffer = fs.readFileSync(imagePngPath);

              await request(app.getHttpServer())
                .post(sendMessagePath(firstUserData.id))
                .attach('image', imagePngBuffer, 'image-png.png')
                .set('Authorization', `Bearer ${fiveUserData.token}`)
                .expect(500);
            });
            it('Шаг 8 - /Get чатов для первого пользователя, ожидается порядок 5, 2, 4, 3', async () => {
              const response = await request(app.getHttpServer())
                .get(getAllChatsPath)
                .set('Authorization', `Bearer ${firstUserData.token}`)
                .expect(200);

              expect(response.body).toEqual(
                expect.arrayContaining(
                  eightAndNineStepsResponseBody(
                    fiveUserData.id,
                    secondUserData.id,
                  ),
                ),
              );
            });
            it('Шаг 9 - /Get чатов для первого пользователя с фильтрацией по username, должны вернутся только 2 чата со 2 и 5 пользователем у которых username начинается на an', async () => {
              const response = await request(app.getHttpServer())
                .get(`${getAllChatsPath}?username=an`)
                .set('Authorization', `Bearer ${firstUserData.token}`)
                .expect(200);

              expect(response.body).toEqual(
                eightAndNineStepsResponseBody(
                  fiveUserData.id,
                  secondUserData.id,
                ),
              );
            });
          });
          describe('Шаг 10 и 11 - Первый отправляет голосовое в формате mp4 (m4a) и запрашивает чат где должен увидеть что голосовое сохранилось корректно', () => {
            it('Первый отправляет голосовое второму', async () => {
              const voicePath = path.join(
                __dirname,
                './audio',
                'voice-mp4.mp4',
              );
              const voiceBuffer = fs.readFileSync(voicePath);

              await request(app.getHttpServer())
                .post(`/messenger/send-voice/${secondUserData.id}`)
                .attach('voice', voiceBuffer, 'voice-mp4.mp4')
                .set('Authorization', `Bearer ${firstUserData.token}`)
                .expect(500);
            });
            it('/Get Current Chat первый пользователь запрашивает чат со вторым', async () => {
              const response = await request(app.getHttpServer())
                .get(getOneChatPath(chatWithSecondUserId))
                .set('Authorization', `Bearer ${firstUserData.token}`)
                .expect(200);

              expect(response.body).toEqual({
                chatId: chatWithSecondUserId,
                members: expect.arrayContaining([
                  {
                    userId: secondUserData.id,
                    username: secondUserData.username,
                  },
                  {
                    userId: firstUserData.id,
                    username: firstUserData.username,
                  },
                ]),
                messages: expect.arrayContaining([
                  {
                    id: expect.any(Number),
                    userId: firstUserData.id,
                    message: null,
                    imgUrl: null,
                    voiceUrl: expect.stringContaining('.mp4'),
                    createdAt: expect.any(String),
                  },
                ]),
              });
            });
          });
          describe('Delete all - удаление всех сущностей созданных во время тестирования', () => {
            // it('Удаление чатов', async () => {
            //   await chatsRepository.deleteByIds(allChatsIds);
            //
            //   const response = await request(app.getHttpServer())
            //     .get(getAllChatsPath)
            //     .set('Authorization', `Bearer ${firstUserData.token}`)
            //     .expect(200);
            //
            //   expect(response.body).toEqual([]);
            // });
            // it('Удаление пользователей', async () => {
            //   const userIds = [
            //     firstUserData.id,
            //     secondUserData.id,
            //     thirdUserData.id,
            //     fourUserData.id,
            //     fiveUserData.id,
            //   ];
            //
            //   await usersRepository.deleteByIds(userIds);
            //
            //   const users = await usersRepository.getUserByIds(userIds);
            //   expect(users).toEqual([]);
            // });
          });
        },
      );
    },
  );
});
