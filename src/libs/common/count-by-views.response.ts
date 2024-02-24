import { ApiProperty } from '@nestjs/swagger';

export class CountByViewsResponse {
  @ApiProperty()
  routeId: string;
  @ApiProperty()
  views: number;
}
