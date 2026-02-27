import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  nombre: string;
}
