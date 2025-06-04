import { PartialType } from "@nestjs/swagger";
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

//* Indicadores DTOs ---- */
export class CreateIndicadorDto {
  @ApiProperty({ maxLength: 50 })
  @IsString()
  @Length(1, 50)
  codigo: string;

  @ApiProperty({ maxLength: 100 })
  @IsString()
  @Length(1, 100)
  nombre: string;

  @ApiProperty({ maxLength: 4000 })
  @IsString()
  @Length(1, 4000)
  objetivo: string;

  @ApiProperty({ maxLength: 1000 })
  @IsString()
  @Length(1, 1000)
  alcance: string;

  @ApiProperty({ maxLength: 1000 })
  @IsString()
  @Length(1, 1000)
  formula: string;

  @ApiProperty()
  @IsInt()
  fkidtipoindicador: number;

  @IsOptional()
  tipoIndicadorData?: { nombre: string };

  @ApiProperty()
  @IsInt()
  fkidunidadmedicion: number;

  @IsOptional()
  unidadMedicionData?: { descripcion: string };

  @ApiProperty({ maxLength: 1000 })
  @IsString()
  @Length(1, 1000)
  meta: string;

  @ApiProperty()
  @IsInt()
  fkidsentido: number;

  @IsOptional()
  sentidoData?: { nombre: string };

  @ApiProperty()
  @IsInt()
  fkidfrecuencia: number;

  @IsOptional()
  frecuenciaData?: { nombre: string };

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fkidarticulo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fkidliteral?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fkidnumeral?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fkidparagrafo?: string;
}

export class UpdateIndicadorDto extends PartialType(CreateIndicadorDto) {}

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
    description:
      "Fecha de cálculo del resultado (puede ser string o date-time)",
    example: "2024-06-01T00:00:00.000Z",
    type: String,
    format: "date-time"
  })
  @IsString()
  fechacalculo: string;

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

export class CreateUnitOfMeasurementDto {
  @ApiProperty({
    description: "Descripción de la unidad de medición",
    maxLength: 200,
    example: "Kilogramos"
  })
  @IsString()
  @Length(1, 200)
  descripcion: string;
}

//* Frecuencia DTOs ----//

export class CreateFrecuenciaDto {
  @ApiProperty({
    description: "Nombre de la frecuencia",
    maxLength: 200,
    example: "Mensual"
  })
  @IsString()
  @Length(1, 200)
  nombre: string;
}
