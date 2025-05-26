import { PartialType } from "@nestjs/swagger";
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Length
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

//* Tipo de indicador DTOs ----//
export class CreateTypeIndicatorDto {
  @ApiProperty({
    description: "Nombre del tipo de indicador",
    maxLength: 200,
    example: "Indicador de desempeño"
  })
  @IsString()
  @Length(1, 200)
  nombre: string;
}

export class UpdateTypeIndicatorDto extends PartialType(
  CreateTypeIndicatorDto
) {}

//* Resultados de indicador DTOs ----//
export class CreateResultadoIndicadorDto {
  @ApiProperty({
    description: "Resultado numérico del indicador",
    example: 95.5,
    type: Number
  })
  @IsNumber()
  resultado: number;

  @ApiProperty({
    description: "Fecha de cálculo del resultado",
    example: "2024-06-01T00:00:00.000Z",
    type: String,
    format: "date-time"
  })
  @IsDateString()
  fechacalculo: Date;

  @ApiProperty({
    description: "ID del indicador relacionado",
    example: 1,
    type: Number,
    minimum: 1
  })
  @IsInt()
  @IsPositive()
  fkidindicador: number;
}

export class UpdateResultadoIndicadorDto extends PartialType(
  CreateResultadoIndicadorDto
) {}

//* sentido Dtos ----//
export class CreateSentidoDto {
  @ApiProperty({
    description: "Nombre del sentido",
    maxLength: 200,
    example: "Ascendente"
  })
  @IsString()
  @Length(1, 200)
  nombre: string;
}

export class UpdateSentidoDto extends PartialType(CreateSentidoDto) {}
