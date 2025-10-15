import { OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class CreateTenantDto extends OmitType(CreateUserDto, [
  'isAdmin',
  'tenantId',
] as const) {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  tenantId: string;
}
