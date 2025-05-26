import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsString,
  MinLength,
  IsArray,
  ArrayNotEmpty,
  IsInt
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
