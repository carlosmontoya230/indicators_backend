import { IsInt, IsPositive, IsString, Length } from "class-validator";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";

export class CreateRepresentVisualDto {
  @ApiProperty({
    description: "Nombre de la representación visual",
    maxLength: 100,
    example: "Gráfico de barras"
  })
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @Length(1, 100, { message: "El nombre debe tener entre 1 y 100 caracteres" })
  nombre: string;
}

export class UpdateRepresentVisualDto extends PartialType(
  CreateRepresentVisualDto
) {
  @ApiPropertyOptional({
    description: "Nombre de la representación visual",
    maxLength: 100,
    example: "Gráfico de líneas"
  })
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @Length(1, 100, { message: "El nombre debe tener entre 1 y 100 caracteres" })
  nombre?: string;
}

export class CreateRepresentVisualPerIndicatorDto {
  @ApiProperty({
    description: "ID del indicador",
    example: 1,
    minimum: 1,
    type: Number
  })
  @IsInt({ message: "El ID del indicador debe ser un número entero" })
  @IsPositive({ message: "El ID del indicador debe ser un número positivo" })
  fkidindicador: number;

  @ApiProperty({
    description: "ID de la representación visual",
    example: 2,
    minimum: 1,
    type: Number
  })
  @IsInt({
    message: "El ID de la representación visual debe ser un número entero"
  })
  @IsPositive({
    message: "El ID de la representación visual debe ser un número positivo"
  })
  fkidrepresenvisual: number;
}

export class UpdateVisualPerIndicatorDto extends PartialType(
  CreateRepresentVisualPerIndicatorDto
) {
  @ApiPropertyOptional({
    description: "ID del indicador",
    example: 1,
    minimum: 1,
    type: Number
  })
  @IsInt({ message: "El ID del indicador debe ser un número entero" })
  @IsPositive({ message: "El ID del indicador debe ser un número positivo" })
  fkidindicador?: number;

  @ApiPropertyOptional({
    description: "ID de la representación visual",
    example: 2,
    minimum: 1,
    type: Number
  })
  @IsInt({
    message: "El ID de la representación visual debe ser un número entero"
  })
  @IsPositive({
    message: "El ID de la representación visual debe ser un número positivo"
  })
  fkidrepresenvisual?: number;
}
