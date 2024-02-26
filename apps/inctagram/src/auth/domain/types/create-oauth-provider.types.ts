import { ProviderType } from '../entities/oauth-provider.entity';

export type CreateOauthProviderTypes = {
  providerId: string;
  providerType: ProviderType;
  email: string | null;
  userId: number;
};
