import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import * as vss from 'azure-devops-node-api/interfaces/Common/VSSInterfaces';

export class AzureCreateDto {
  @ApiProperty({ example: 'guoxianzhe' })
  @IsNotEmpty()
  project: string;

  @ApiProperty({
    example: [
      {
        op: 'add',
        path: '/fields/System.Title',
        value: 'Task created from Node JS',
      },
      {
        op: 'add',
        path: '/fields/System.AssignedTo',
        value: 'guoxianzhe@agora.io',
      },
      {
        op: 'add',
        path: '/fields/Microsoft.VSTS.Common.Priority',
        value: '1',
      },
      {
        op: 'add',
        path: '/fields/System.Description',
        value: 'this is description',
      },
    ],
  })
  @IsNotEmpty()
  workItem: vss.JsonPatchDocument;
}
