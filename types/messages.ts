export enum FilesMicroserviceMessagesEnum {
  UPLOAD_AVATAR = 'upload-avatar',
  DELETE_AVATAR = 'delete-avatar',
  GET_AVATAR = 'get-avatar',
  GET_POST_IMAGES = 'get-post-images',
  UPLOAD_POST_IMAGES = 'upload-post-images',
  DELETE_POST_IMAGE = 'delete-post-image',
  GET_USER_THUMBNAIL_AVATAR = 'get-user-thumbnail-avatar',
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
  GET_USER_PAYMENTS = 'get-user-payments',
}
