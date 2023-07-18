import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AzureService } from './azure.service';
import { AzureCreateDto } from './dto/azure-create.dto';
import { AzureUpdateDto } from './dto/azure-update.dto';

@ApiTags('Azure')
@Controller({
  path: 'azure',
  version: '1',
})
export class AzureController {
  constructor(private readonly azureService: AzureService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('ticket/create')
  @UseInterceptors(FileInterceptor('file'))
  async createWork(@Body() createDto: AzureCreateDto) {
    return this.azureService.createWork(createDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('ticket/update')
  @UseInterceptors(FileInterceptor('file'))
  async updateWork(@Body() updateDto: AzureUpdateDto) {
    return this.azureService.updateWork(updateDto);
  }
}
