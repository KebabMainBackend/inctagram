// //import io from 'socket.io-cliente'
// const io = require('socket.io-client');
//
// // Подключаемся к вашему серверу
// const socket = io('http://localhost:3000');
//
// // Обработчик успешного подключения
// socket.on('connect', () => {
//   console.log('Connected to server with id:', socket.id);
// });
//
// socket.on('close', () => {
//   console.log('DISCONNECTED:', socket.id);
// });
//
// // Отправляем тестовое сообщение на сервер
// socket.emit('message', { text: 'Hello from client' });
//
// // Обрабатываем сообщение с сервера
// socket.on('message', (data) => {
//   console.log('Message from server:', data);
// });
