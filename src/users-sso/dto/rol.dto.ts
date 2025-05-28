import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateRolDto {
  @ApiProperty({
    description: "Nombre del rol",
    example: "Administrador"
  })
  @IsString({ message: "El nombre debe ser una cadena de texto." })
  @Length(3, 50, {
    message:
      "El nombre debe tener entre $constraint1 y $constraint2 caracteres."
  })
  nombre: string;
}
