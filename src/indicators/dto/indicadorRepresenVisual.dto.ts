import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsString,
  IsArray,
  ArrayNotEmpty,
  Min,
  MaxLength
} from "class-validator";

export class IndicadorRepresentVisualDto {
  @ApiProperty({ example: 1, description: "ID único del indicador" })
  @IsInt({ message: "El id debe ser un número entero" })
  @Min(1, { message: "El id debe ser mayor que cero" })
  id: number;

  @ApiProperty({
    example: "Indicador de Ventas",
    description: "Nombre del indicador"
  })
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @MaxLength(100, { message: "El nombre no debe exceder 100 caracteres" })
  nombre: string;

  @ApiProperty({ example: "VENTAS2024", description: "Código del indicador" })
  @IsString({ message: "El código debe ser una cadena de texto" })
  @MaxLength(50, { message: "El código no debe exceder 50 caracteres" })
  codigo: string;

  @ApiProperty({
    example: "Aumentar ventas en 2024",
    description: "Objetivo del indicador"
  })
  @IsString({ message: "El objetivo debe ser una cadena de texto" })
  objetivo: string;

  @ApiProperty({
    example: "ventas_totales / meses",
    description: "Fórmula del indicador"
  })
  @IsString({ message: "La fórmula debe ser una cadena de texto" })
  formula: string;

  @ApiProperty({ example: "1000", description: "Meta del indicador" })
  @IsString({ message: "La meta debe ser una cadena de texto" })
  meta: string;

  @ApiProperty({
    type: [String],
    example: ["gráfico de barras", "gráfico de líneas"],
    description: "Representaciones visuales permitidas"
  })
  @IsArray({ message: "La representación visual debe ser un arreglo" })
  @ArrayNotEmpty({ message: "Debe haber al menos una representación visual" })
  @IsString({
    each: true,
    message: "Cada representación visual debe ser una cadena de texto"
  })
  representVisual: string[];
}
