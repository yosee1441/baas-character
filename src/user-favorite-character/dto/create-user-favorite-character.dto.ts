import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsPositive, Max } from 'class-validator';

export class CreateUserFavoriteCharacterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @Max(99999999999)
  @Type(() => Number)
  readonly userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @Max(99999999999)
  @Type(() => Number)
  readonly characterId: number;
}
