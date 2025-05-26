import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateArticleDto {
  @ApiProperty({ example: "A1" })
  @IsString({ message: "El id debe ser una cadena de texto." })
  @IsNotEmpty({ message: "El id es obligatorio." })
  id: string;

  @ApiProperty({ example: "Artículo 1" })
  @IsString({ message: "El nombre debe ser una cadena de texto." })
  @IsNotEmpty({ message: "El nombre es obligatorio." })
  nombre: string;

  @ApiProperty({ example: "Descripción del artículo" })
  @IsString({ message: "La descripción debe ser una cadena de texto." })
  @IsNotEmpty({ message: "La descripción es obligatoria." })
  descripcion: string;

  @ApiProperty({ example: "S1" })
  @IsString({ message: "El fkidseccion debe ser una cadena de texto." })
  @IsNotEmpty({ message: "El fkidseccion es obligatorio." })
  fkidseccion: string;

  @ApiProperty({ example: "SS1" })
  @IsString({ message: "El fkidsubseccion debe ser una cadena de texto." })
  @IsNotEmpty({ message: "El fkidsubseccion es obligatorio." })
  fkidsubseccion: string;
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
