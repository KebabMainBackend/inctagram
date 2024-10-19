export enum FilesMicroserviceMessagesEnum {
  UPLOAD_AVATAR = 'upload-avatar',
  DELETE_AVATAR = 'delete-avatar',
  GET_AVATAR = 'get-avatar',
  GET_POST_IMAGES = 'get-post-images',
  UPLOAD_POST_IMAGES = 'upload-post-images',
  DELETE_POST_IMAGE = 'delete-post-image',
  GET_USER_THUMBNAIL_AVATAR = 'get-user-thumbnail-avatar',
  GET_USER_ALL_PHOTOS = 'get-user-all-photos',
  DELETE_USER_ALL_PHOTOS = 'delete-user-all-photos',
  DELETE_POST_IMAGES = 'delete-post-images',
  UPLOAD_MESSENGER_IMAGE = 'upload-messenger-image',
  UPLOAD_MESSENGER_VOICE = 'upload-messenger-voice',
  GET_MESSENGER_IMAGE = 'get-messenger-image',
}

export enum PaymentsMicroserviceMessagesEnum {
  GET_ALL_SUBSCRIPTIONS = 'get-all-subscriptions',
  GET_CURRENT_SUBSCRIPTION = 'get-current-subscription',
  PURCHASE_SUBSCRIPTION = 'purchase-subscription',
  UPDATE_AUTO_RENEWAL = 'update-auto-renewal',
  STRIPE_CREATE_PRODUCT = 'stripe-create-product',
  STRIPE_FINISH_PAYMENT = 'stripe-finish-payment',
  PAYPAL_CREATE_PRODUCT = 'paypal-create-product',
  PAYPAL_FINISH_PAYMENT = 'paypal-finish-payment',
  PAYPAL_CREATE_WEBHOOK = 'paypal_create_webhook',
  GET_USER_PAYMENTS = 'get-user-payments',
  GET_USERS_PAYMENTS = 'get-users-payments',
}

export enum MessagesMicroserviceMessagesEnum {
  GET_CHAT = 'get-chat',
  GET_ALL_CHATS = 'get-all-chats',
  SEND_MESSAGE = 'send-message',
  EDIT_MESSAGE = 'edit-message',
  DELETE_MESSAGE = 'delete-message',
}

// Создание чата - без участия пользователя
// Получение чата - endpoint с query username
// Отправка смс пользователю - endpoint
// Отправка фотки пользователю - endpoint
// Отправка гс пользователю - endpoint
// Редактирование сообщения - endpoint с body id: uuid
// Удаление сообщения - endpoint с body forAll: boolean
