import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength
} from "class-validator";
import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";

export class UpdateFuenteDto {
  @ApiPropertyOptional({
    description: "Nombre de la fuente",
    maxLength: 2000,
    type: String,
    example: "Ministerio de Salud"
  })
  @IsOptional()
  @IsString({ message: "El nombre debe ser una cadena" })
  @MaxLength(2000, {
    message: "El nombre no puede superar los 2000 caracteres"
  })
  nombre?: string;
}

export class CreateFuentesPorIndicadorDto {
  @ApiPropertyOptional({
    description: "ID de la fuente",
    type: Number,
    example: 1
  })
  @IsInt({ message: "El ID de la fuente debe ser un número entero" })
  @IsPositive({ message: "El ID de la fuente debe ser un número positivo" })
  fkidfuente: number;

  @ApiPropertyOptional({
    description: "ID del indicador",
    type: Number,
    example: 10
  })
  @IsInt({ message: "El ID del indicador debe ser un número entero" })
  @IsPositive({ message: "El ID del indicador debe ser un número positivo" })
  fkidindicador: number;
}

export class UpdateFuentesPorIndicadorDto extends PartialType(
  CreateFuentesPorIndicadorDto
) {}
