import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import * as vss from 'azure-devops-node-api/interfaces/Common/VSSInterfaces';

export class AzureUpdateDto {
  @ApiProperty({ example: 'guoxianzhe' })
  @IsNotEmpty()
  project: string;

  @ApiProperty({ example: 4 })
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: [
      {
        op: 'update',
        path: '/fields/System.Title',
        value: 'change title',
      },
      {
        op: 'update',
        path: '/fields/System.Description',
        value: 'this is description',
      },
    ],
  })
  @IsNotEmpty()
  workItem: vss.JsonPatchDocument;
}
