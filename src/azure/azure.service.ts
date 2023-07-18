import { WebApi, getPersonalAccessTokenHandler } from 'azure-devops-node-api';
import * as WorkItemTrackingApi from 'azure-devops-node-api/WorkItemTrackingApi';
import * as WorkItemTrackingInterfaces from 'azure-devops-node-api/interfaces/WorkItemTrackingInterfaces';

import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { AzureCreateDto } from './dto/azure-create.dto';
import { AzureUpdateDto } from './dto/azure-update.dto';

@Injectable()
export class AzureService {
  private azdev: WebApi;
  private organizationName: string;
  constructor(private readonly configService: ConfigService<AllConfigType>) {
    this.organizationName = this.configService.get('azure.organizationName', {
      infer: true,
    })!;
    const orgUrl = `https://dev.azure.com/${this.organizationName}`;

    const token: string = this.configService.get('azure.personalAccessToken', {
      infer: true,
    })!;

    const authHandler = getPersonalAccessTokenHandler(token);
    this.azdev = new WebApi(orgUrl, authHandler);
  }

  async createWork(
    createDto: AzureCreateDto,
  ): Promise<WorkItemTrackingInterfaces.WorkItem> {
    const workItemTrackingApiObject: WorkItemTrackingApi.IWorkItemTrackingApi =
      await this.azdev.getWorkItemTrackingApi();
    let createdEpic: WorkItemTrackingInterfaces.WorkItem;
    try {
      createdEpic = await workItemTrackingApiObject.createWorkItem(
        {},
        createDto.workItem,
        createDto.project,
        'epic',
      );
    } catch (e) {
      throw new HttpException(
        {
          status: e.result.errorCode,
          errors: e.result.message,
        },
        e.statusCode,
      );
    }

    return createdEpic;
  }

  async updateWork(
    updateDto: AzureUpdateDto,
  ): Promise<WorkItemTrackingInterfaces.WorkItem> {
    const workItemTrackingApiObject: WorkItemTrackingApi.IWorkItemTrackingApi =
      await this.azdev.getWorkItemTrackingApi();
    let createdEpic: WorkItemTrackingInterfaces.WorkItem;
    try {
      createdEpic = await workItemTrackingApiObject.updateWorkItem(
        {},
        updateDto.workItem,
        updateDto.id,
        updateDto.project,
      );
    } catch (e) {
      throw new HttpException(
        {
          status: e.result.errorCode,
          errors: e.result.message,
        },
        e.statusCode,
      );
    }

    return createdEpic;
  }
}
