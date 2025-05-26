import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFuenteDto {
  @ApiProperty({
    description: "Nombre de la fuente",
    maxLength: 2000,
    example: "Ministerio de Salud",
    type: String,
    required: true
  })
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString({ message: "El nombre debe ser una cadena" })
  @MaxLength(2000, {
    message: "El nombre no puede superar los 2000 caracteres"
  })
  nombre: string;
}
