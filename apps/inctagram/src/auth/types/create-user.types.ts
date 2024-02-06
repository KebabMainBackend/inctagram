export type CreateUserTypes = {
  username: string;
  passwordHash: string;
  email: string;
  confirmationCode: string;
  codeExpirationDate: Date;
};
