import { registerAs } from '@nestjs/config';
import { AzureConfig } from './config.type';
import { IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  AZURE_ORGANIZATION_NAME: string;

  @IsString()
  AZURE_PERSONAL_ACCESS_TOKEN: string;
}

export default registerAs<AzureConfig>('azure', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);
  return {
    organizationName: process.env.AZURE_ORGANIZATION_NAME,
    personalAccessToken: process.env.AZURE_PERSONAL_ACCESS_TOKEN,
  };
});
