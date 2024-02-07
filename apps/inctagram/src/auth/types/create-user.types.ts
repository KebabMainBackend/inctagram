export type CreateUserTypes = {
  username: string;
  passwordHash: string;
  passwordSalt: string;
  email: string;
  confirmationCode: string;
  codeExpirationDate: Date;
};
