import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateActorDto {
  @ApiProperty({
    description: "Nombre del actor",
    maxLength: 2000,
    minLength: 1,
    example: "Juan Pérez"
  })
  @IsString()
  @Length(1, 2000)
  nombre: string;

  @ApiProperty({
    description: "ID del tipo de actor",
    maxLength: 100,
    minLength: 1,
    example: "tipo-actor-1"
  })
  @IsString()
  @Length(1, 100)
  fkidtipoactor: string;
}

export class UpdateActorDto extends PartialType(CreateActorDto) {}

export class CreateTipoActorDto {
  @ApiProperty({
    description: "Nombre del tipo de actor",
    maxLength: 200,
    minLength: 1,
    example: "Organización"
  })
  @IsString()
  @Length(1, 200)
  nombre: string;
}

export class UpdateTipoActorDto extends PartialType(CreateTipoActorDto) {}
