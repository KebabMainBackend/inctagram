import * as bcrypt from 'bcrypt';

export class UserHashingManager {
  generateHash(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  private _generateSalt(round: number) {
    return bcrypt.genSalt(round);
  }

  async getHashAndSalt(password: string) {
    const passwordSalt = await this._generateSalt(10);
    const passwordHash = await this.generateHash(password, passwordSalt);

    return { passwordHash, passwordSalt };
  }
}
