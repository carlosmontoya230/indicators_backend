import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsString,
  MinLength,
  IsArray,
  ArrayNotEmpty,
  IsInt,
  IsOptional
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "usuario@email.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "contraseñaSegura123" })
  @IsString()
  @MinLength(10)
  contrasena: string;

  @ApiProperty({ type: [Number], example: [1, 2] })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  roles: number[];
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: "nuevaPassword123" })
  @IsOptional()
  @IsString()
  @MinLength(6)
  contrasena?: string;

  @ApiPropertyOptional({ example: [1, 2], type: [Number] })
  @IsOptional()
  @IsArray()
  roles?: number[];
}
