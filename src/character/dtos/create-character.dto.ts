import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateCharacterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  @IsOptional()
  readonly status: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  readonly species: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  @IsOptional()
  readonly type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  @IsOptional()
  readonly gender: string;
}
