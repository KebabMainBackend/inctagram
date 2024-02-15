import { BaseEntity } from '../../../utils/base.entity';
import { CreateOauthProviderTypes } from '../types/create-oauth-provider.types';

export enum ProviderType {
  GOOGLE = 'google',
  GITHUB = 'github',
}
export class OauthProviderEntity extends BaseEntity {
  id: number;
  providerId: string;
  providerType: ProviderType;
  email: string | null;
  userId: number;

  static create(data: CreateOauthProviderTypes) {
    const provider = new OauthProviderEntity();
    provider.providerType = data.providerType;
    provider.email = data.email;
    provider.userId = data.userId;
    provider.providerId = data.providerId;
    return provider;
  }
}
