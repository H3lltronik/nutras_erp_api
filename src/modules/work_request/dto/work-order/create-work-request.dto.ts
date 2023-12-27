import { IsEntityExist } from '@/src/common/decorators/dto/is_entity_exists/is_entity_exists.decorator';
import { User } from '@/src/modules/users/entities/user.entity';
import { IsBoolean, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class CreateWorkRequestDto {
  @IsOptional()
  @IsBoolean()
  isDraft?: boolean;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  folio: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  @IsEntityExist(User)
  userId: string;
}
