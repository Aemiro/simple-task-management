import { ApiProperty } from '@nestjs/swagger';

export class GetByCarTypeResponse {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  vehicleId: string;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  count: number;
}
