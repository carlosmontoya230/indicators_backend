import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus
} from "@nestjs/common";
import { AdminActorsService } from "../services/adminActors.service";
import {
  CreateResponsablePorIndicadorDto,
  CreateTipoActorDto,
  UpdateTipoActorDto
} from "../dto/admin-actors.dto";
import { TipoActor } from "../entities/actors/typeActor.entity";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateActorDto, UpdateActorDto } from "../dto/admin-actors.dto";
import { Actor } from "../entities/actors/actor.entity";
import { ApiBody } from "@nestjs/swagger";
import { ResponsablesPorIndicador } from "../entities/actors/reponsiblePerIndicator.entity";

@ApiTags("admin actor")
@Controller("actor")
export class AdminActorsController {
  constructor(private readonly adminActorsService: AdminActorsService) {}

  //* -- actor ---
  @ApiOperation({ summary: "Crear actor" })
  @ApiResponse({
    status: 201,
    description: "Actor creado correctamente.",
    type: Actor
  })
  @ApiBody({ type: CreateActorDto })
  @Post("/create-actor/")
  async createActor(@Body() dto: CreateActorDto) {
    return this.adminActorsService.createActor(dto);
  }

  @ApiOperation({ summary: "Obtener todos los actores" })
  @ApiResponse({
    status: 200,
    description: "Lista de actores.",
    type: [Actor]
  })
  @Get("/all-actors/")
  async findAllActors() {
    return this.adminActorsService.findAllActors();
  }

  @ApiOperation({ summary: "Obtener actor por id" })
  @ApiResponse({
    status: 200,
    description: "Actor encontrado.",
    type: Actor
  })
  @Get("/id-actor/:id")
  async findOneActor(@Param("id") id: string) {
    return this.adminActorsService.findActorById(id);
  }

  @ApiOperation({ summary: "Actualizar actor" })
  @ApiResponse({
    status: 200,
    description: "Actor actualizado correctamente.",
    type: Actor
  })
  @Put("/update-actor-id/:id")
  async updateActor(@Param("id") id: string, @Body() dto: UpdateActorDto) {
    return this.adminActorsService.updateActor(id, dto);
  }

  @ApiOperation({ summary: "Eliminar actor" })
  @ApiResponse({
    status: 200,
    description: "Actor eliminado correctamente."
  })
  @Delete("/delete-actor-id/:id")
  @HttpCode(HttpStatus.OK)
  async removeActor(@Param("id") id: string) {
    await this.adminActorsService.deleteActor(id);
    return { message: "Actor eliminado correctamente" };
  }

  //* -- tipo actor ---
  @ApiOperation({ summary: "Crear tipo de actor" })
  @ApiResponse({
    status: 201,
    description: "Tipo de actor creado correctamente.",
    type: TipoActor
  })
  @Post("/create-type-actor/")
  async createTypeActor(@Body() dto: CreateTipoActorDto) {
    return this.adminActorsService.createTypeActor(dto);
  }

  @ApiOperation({ summary: "Obtener todos los tipos de actor" })
  @ApiResponse({
    status: 200,
    description: "Lista de tipos de actor.",
    type: [TipoActor]
  })
  @Get("/all-type-actors/")
  async findAllTypeActors() {
    return this.adminActorsService.findAllTypeActors();
  }

  @ApiOperation({ summary: "Obtener tipo de actor por id" })
  @ApiResponse({
    status: 200,
    description: "Tipo de actor encontrado.",
    type: TipoActor
  })
  @Get("/id-type-actor/:id")
  async findOneTypeActor(@Param("id", ParseIntPipe) id: number) {
    return this.adminActorsService.findTypeActorById(id);
  }

  @ApiOperation({ summary: "Actualizar tipo de actor" })
  @ApiResponse({
    status: 200,
    description: "Tipo de actor actualizado correctamente.",
    type: TipoActor
  })
  @Put("/update-type-actor-id/:id")
  async updateTypeActor(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateTipoActorDto
  ) {
    return this.adminActorsService.updateTypeActor(id, dto);
  }

  @ApiOperation({ summary: "Eliminar tipo de actor" })
  @ApiResponse({
    status: 200,
    description: "Tipo de actor eliminado correctamente."
  })
  @Delete("/delete-type-actor-id/:id")
  @HttpCode(HttpStatus.OK)
  async removeTypeActor(@Param("id", ParseIntPipe) id: number) {
    await this.adminActorsService.deleteTypeActor(id);
    return { message: "Tipo de actor eliminado correctamente" };
  }

  //* responsables por indicador

  @ApiOperation({ summary: "Obtener todos los responsables de un indicador" })
  @ApiResponse({ status: 200, type: [ResponsablesPorIndicador] })
  @Get("/responsible-per-indicator/:fkidindicador/")
  async getAllByIndicador(
    @Param("fkidindicador", ParseIntPipe) fkidindicador: number
  ) {
    return this.adminActorsService.getReponsibleByIndicator(fkidindicador);
  }

  @ApiOperation({ summary: "Asignar un responsable a un indicador" })
  @ApiBody({ type: CreateResponsablePorIndicadorDto })
  @ApiResponse({ status: 201, type: ResponsablesPorIndicador })
  @Post("/assign-responsible/")
  async create(@Body() dto: CreateResponsablePorIndicadorDto) {
    return this.adminActorsService.createResponsibleByIndicator(dto);
  }

  @ApiOperation({
    summary: "Obtener todos los responsables agrupados por indicador"
  })
  @ApiResponse({
    status: 200,
    description: "Lista agrupada por indicador",
    type: [ResponsablesPorIndicador]
  })
  @Get("/getAll/responsible-per-indicator/")
  async getAllGrouped() {
    return this.adminActorsService.getAllReponsibleByIndicator();
  }

  @Delete(":fkidindicador/:fkidresponsable")
  async delete(
    @Param("fkidindicador", ParseIntPipe) fkidindicador: number,
    @Param("fkidresponsable") fkidresponsable: string
  ) {
    await this.adminActorsService.deleteResponsibleByIndicator(
      fkidresponsable,
      fkidindicador
    );
    return {
      message: "Relación responsable-indicador eliminada correctamente"
    };
  }
}
