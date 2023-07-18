import { Module } from '@nestjs/common';
import { AzureService } from './azure.service';
import { AzureController } from './azure.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [AzureService],
  exports: [AzureService],
  controllers: [AzureController],
})
export class AzureModule {}
