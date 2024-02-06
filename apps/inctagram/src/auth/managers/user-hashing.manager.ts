import * as bcrypt from 'bcrypt';

export class UserHashingManager {
  _generateHash(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  _generateSalt(round: number) {
    return bcrypt.genSalt(round);
  }

  async getHashAndSalt(password: string) {
    const passwordSalt = await this._generateSalt(10);
    const passwordHash = await this._generateHash(password, passwordSalt);

    return { passwordHash };
  }
}
