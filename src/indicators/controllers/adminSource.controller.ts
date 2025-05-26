import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body
} from "@nestjs/common";
import { AdminSourceService } from "../services/adminSource.service";
import { CreateFuenteDto } from "../dto/create-fuente.dto";
import {
  CreateFuentesPorIndicadorDto,
  UpdateFuenteDto,
  UpdateFuentesPorIndicadorDto
} from "../dto/update-fuente.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("admin fuente")
@Controller("source")
export class AdminSourceController {
  constructor(private readonly adminSourceService: AdminSourceService) {}

  @ApiOperation({ summary: "Crear fuente" })
  @ApiResponse({ status: 201, description: "Fuente creada correctamente." })
  @Post("/create-source/")
  async createSource(@Body() createFuenteDto: CreateFuenteDto) {
    return this.adminSourceService.createSource(createFuenteDto);
  }

  @ApiOperation({ summary: "Obtener todas las fuentes" })
  @ApiResponse({ status: 200, description: "Lista de fuentes." })
  @Get("/all-sources/")
  async findAllSource() {
    return this.adminSourceService.findAllSources();
  }

  @ApiOperation({ summary: "Obtener fuente por id" })
  @ApiResponse({ status: 200, description: "Fuente encontrada." })
  @Get("/id-source/:id")
  async findOneSource(@Param("id") id: number) {
    return this.adminSourceService.findOneSource(id);
  }

  @ApiOperation({ summary: "Actualizar fuente" })
  @ApiResponse({
    status: 200,
    description: "Fuente actualizada correctamente."
  })
  @Put("/update-source-id/:id")
  async updateSource(
    @Param("id") id: number,
    @Body() updateFuenteDto: UpdateFuenteDto
  ) {
    return this.adminSourceService.updateSource(id, updateFuenteDto);
  }

  @ApiOperation({ summary: "Eliminar fuente" })
  @ApiResponse({ status: 200, description: "Fuente eliminada correctamente." })
  @Delete("/delete-source-id/:id")
  async removeSource(@Param("id") id: number) {
    await this.adminSourceService.removeSource(id);
    return { message: "Fuente eliminada correctamente" };
  }

  //-- Fuentes por indicador ----//
  @ApiOperation({ summary: "Crear fuente por indicador" })
  @ApiResponse({
    status: 201,
    description: "Relación fuente-indicador creada correctamente."
  })
  @Post("/create-source-per-indicator/")
  async createSourcePerIndicator(@Body() dto: CreateFuentesPorIndicadorDto) {
    return this.adminSourceService.createSourcePerIndicator(dto);
  }

  @ApiOperation({ summary: "Obtener todas las fuentes por indicador" })
  @ApiResponse({
    status: 200,
    description: "Lista de relaciones fuente-indicador."
  })
  @Get("/all-sources-per-indicator/")
  async findAllSourcePerIndicator() {
    return this.adminSourceService.findAllSourcesPerIndicator();
  }

  @ApiOperation({ summary: "Obtener fuente por indicador por IDs" })
  @ApiResponse({
    status: 200,
    description: "Relación fuente-indicador encontrada."
  })
  @Get("/source-per-indicator/:fkidfuente/:fkidindicador")
  async findOneSourcePerIndicator(
    @Param("fkidfuente") fkidfuente: number,
    @Param("fkidindicador") fkidindicador: number
  ) {
    return this.adminSourceService.findOneSourcePerIndicator(
      fkidfuente,
      fkidindicador
    );
  }

  @ApiOperation({ summary: "Actualizar fuente por indicador" })
  @ApiResponse({
    status: 200,
    description: "Relación fuente-indicador actualizada correctamente."
  })
  @Put("/update-source-per-indicator/:fkidfuente/:fkidindicador")
  async updateSourcePerIndicator(
    @Param("fkidfuente") fkidfuente: number,
    @Param("fkidindicador") fkidindicador: number,
    @Body() dto: UpdateFuentesPorIndicadorDto
  ) {
    return this.adminSourceService.updateSourcePerIndicator(
      fkidfuente,
      fkidindicador,
      dto
    );
  }

  @ApiOperation({ summary: "Eliminar fuente por indicador" })
  @ApiResponse({
    status: 200,
    description: "Relación fuente-indicador eliminada correctamente."
  })
  @Delete("/delete-source-per-indicator/:fkidfuente/:fkidindicador")
  async removeSourcePerIndicator(
    @Param("fkidfuente") fkidfuente: number,
    @Param("fkidindicador") fkidindicador: number
  ) {
    await this.adminSourceService.removeSourcePerIndicator(
      fkidfuente,
      fkidindicador
    );
    return { message: "Relación fuente-indicador eliminada correctamente" };
  }
}
