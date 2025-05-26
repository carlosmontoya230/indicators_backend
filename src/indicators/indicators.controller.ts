import {
  Body,
  Post,
  Put,
  Controller,
  Get,
  Param,
  Res,
  Delete
} from "@nestjs/common";
import { Response } from "express";

import { IndicadorRepresentVisualDto } from "./dto/indicadorRepresenVisual.dto";
import { Indicador } from "./entities/indicator.entity";
import { IndicatorsService } from "./indicators.service";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import {
  CreateResultadoIndicadorDto,
  CreateTypeIndicatorDto,
  UpdateTypeIndicatorDto
} from "./dto/indicators.dto";
import { TipoIndicador } from "./entities/typeIndicator.entity";
import { ResultadoIndicador } from "./entities/resultsIndicator.entity";

@ApiTags("indicators")
@Controller("indicators")
export class IndicatorsController {
  constructor(private readonly indicatorsService: IndicatorsService) {}

  //* --- consultas indicadores ---

  @ApiOperation({ summary: "Obtener todos los indicadores" })
  @ApiResponse({ status: 200, description: "Lista de indicadores." })
  @Get()
  findAll(): Promise<Indicador[]> {
    return this.indicatorsService.findAll();
  }

  @ApiOperation({ summary: "Obtener lista de indicadores" })
  @ApiResponse({ status: 200, description: "Lista de indicadores." })
  @Get("/indicators-list/")
  findIndicatorsList(): Promise<Indicador[]> {
    return this.indicatorsService.findIndicatorsList();
  }

  @ApiOperation({ summary: "Obtener indicadores con representación visual" })
  @ApiResponse({
    status: 200,
    description: "Lista de indicadores con representación visual."
  })
  @Get("/with-represent-visual/")
  findIndicatorWithRepresentVisual(): Promise<IndicadorRepresentVisualDto[]> {
    return this.indicatorsService.findIndicatorWithRepresentVisual();
  }

  @ApiOperation({ summary: "Obtener indicadores con responsables" })
  @ApiResponse({
    status: 200,
    description: "Lista de indicadores con responsables."
  })
  @Get("/with-responsables/")
  findIndicatorsWithResponsables(): Promise<Indicador[]> {
    return this.indicatorsService.findIndicatorsWithResponsables();
  }

  @ApiOperation({ summary: "Obtener indicadores con fuentes" })
  @ApiResponse({
    status: 200,
    description: "Lista de indicadores con fuentes."
  })
  @Get("/with-fuentes/")
  findIndicatorsWithFuentes(): Promise<Indicador[]> {
    return this.indicatorsService.findIndicatorsWithFuentes();
  }

  @ApiOperation({ summary: "Obtener indicadores con variables" })
  @ApiResponse({
    status: 200,
    description: "Lista de indicadores con variables."
  })
  @Get("/with-variables/")
  findIndicatorsWithVariables(): Promise<Indicador[]> {
    return this.indicatorsService.findIndicatorsWithVariables();
  }

  @ApiOperation({ summary: "Obtener indicadores con resultados" })
  @ApiResponse({
    status: 200,
    description: "Lista de indicadores con resultados."
  })
  @Get("/with-resultados/")
  findIndicatorsWithResultados(): Promise<Indicador[]> {
    return this.indicatorsService.findIndicatorsWithResultados();
  }

  @ApiOperation({ summary: "Exportar todos los indicadores a CSV" })
  @ApiResponse({
    status: 200,
    description: "Archivo CSV con todos los indicadores."
  })
  @Get("/export-all-csv/")
  async exportAllCSV(@Res() res: Response) {
    const csv = await this.indicatorsService.exportAllIndicatorsToCSV();
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=indicadores.csv"
    );
    res.send(csv);
  }

  @ApiOperation({ summary: "Exportar todos los indicadores a Excel" })
  @ApiResponse({
    status: 200,
    description: "Archivo Excel con todos los indicadores."
  })
  @Get("/export-all-excel/")
  async exportAllExcel(@Res() res: Response) {
    const buffer = await this.indicatorsService.exportAllIndicatorsToExcel();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=indicadores.xlsx"
    );
    res.send(buffer);
  }

  //*-- tipo indicador ---

  @Post("/create-type-indicators")
  @ApiOperation({ summary: "Crear un nuevo tipo de indicador" })
  @ApiResponse({
    status: 201,
    description: "Tipo de indicador creado.",
    type: TipoIndicador
  })
  async createTypeIndicator(
    @Body() createTypeIndicatorDto: CreateTypeIndicatorDto
  ): Promise<TipoIndicador> {
    return this.indicatorsService.createTypeIndicator(createTypeIndicatorDto);
  }

  @ApiOperation({ summary: "Obtener un tipo de indicador por ID" })
  @ApiResponse({
    status: 200,
    description: "Tipo de indicador encontrado.",
    type: TipoIndicador
  })
  @Get("/type-indicators/:id")
  async findOneTypeIndicator(
    @Res() res: Response,
    @Param("id") id: string
  ): Promise<void> {
    const tipoIndicador = await this.indicatorsService.findOneTypeIndicator(
      Number(id)
    );
    if (!tipoIndicador) {
      res.status(404).json({ message: "Tipo de indicador no encontrado" });
      return;
    }
    res.status(200).json(tipoIndicador);
  }

  @ApiOperation({ summary: "Obtener todos los tipos de indicadores" })
  @ApiResponse({
    status: 200,
    description: "Lista de tipos de indicadores.",
    type: [TipoIndicador]
  })
  @Get("/all-type-indicators/")
  async findAllTypeIndicators(): Promise<TipoIndicador[]> {
    return this.indicatorsService.findAllTypeIndicators();
  }

  @Put("/update/type-indicators/:id")
  @ApiOperation({ summary: "Actualizar un tipo de indicador" })
  @ApiResponse({
    status: 200,
    description: "Tipo de indicador actualizado.",
    type: TipoIndicador
  })
  async updateTypeIndicator(
    @Param("id") id: string,
    @Body() updateTypeIndicatorDto: UpdateTypeIndicatorDto
  ): Promise<TipoIndicador> {
    return this.indicatorsService.updateTypeIndicator(
      Number(id),
      updateTypeIndicatorDto
    );
  }

  @ApiOperation({ summary: "Eliminar un tipo de indicador" })
  @ApiResponse({
    status: 200,
    description: "Tipo de indicador eliminado."
  })
  @Delete("/remove/type-indicators/:id")
  async removeTypeIndicator(
    @Param("id") id: string
  ): Promise<{ message: string }> {
    await this.indicatorsService.removeTypeIndicator(Number(id));
    return { message: "Tipo de indicador eliminado correctamente." };
  }

  //*--- resultados de indicadores ---

  @ApiOperation({ summary: "Crear un nuevo resultado de indicador" })
  @ApiResponse({
    status: 201,
    description: "Resultado de indicador creado.",
    type: ResultadoIndicador
  })
  @ApiBody({ type: CreateResultadoIndicadorDto })
  @Post("/create-results/")
  async createIndicatorResult(
    @Body() dto: CreateResultadoIndicadorDto
  ): Promise<ResultadoIndicador> {
    return this.indicatorsService.createResultadoIndicador(dto);
  }

  @ApiOperation({ summary: "Obtener todos los resultados de indicadores" })
  @ApiResponse({
    status: 200,
    description: "Lista de resultados de indicadores.",
    type: [ResultadoIndicador]
  })
  @Get("/get-results/")
  async findAllIndicatorResults(): Promise<ResultadoIndicador[]> {
    return this.indicatorsService.findAllResultsInicators();
  }

  @ApiOperation({ summary: "Obtener resultado de indicador por ID" })
  @ApiResponse({
    status: 200,
    description: "Resultado de indicador encontrado.",
    type: ResultadoIndicador
  })
  @Get("/results/:id")
  async findIndicatorResultById(
    @Param("id") id: string
  ): Promise<ResultadoIndicador> {
    return this.indicatorsService.findResultIndicatorById(Number(id));
  }

  @ApiOperation({ summary: "Actualizar resultado de indicador" })
  @ApiResponse({
    status: 200,
    description: "Resultado de indicador actualizado.",
    type: ResultadoIndicador
  })
  @Put("/update-results/:id")
  async updateIndicatorResult(
    @Param("id") id: string,
    @Body() dto: CreateResultadoIndicadorDto
  ): Promise<ResultadoIndicador> {
    return this.indicatorsService.updateResultIndicator(Number(id), dto);
  }

  @ApiOperation({ summary: "Eliminar resultado de indicador" })
  @ApiResponse({
    status: 200,
    description: "Resultado de indicador eliminado."
  })
  @Delete("/remove-results/:id")
  async removeIndicatorResult(
    @Param("id") id: string
  ): Promise<{ message: string }> {
    await this.indicatorsService.removeResultIndicator(Number(id));
    return { message: "Resultado de indicador eliminado correctamente." };
  }

  //*--- sentido ---//

  @ApiOperation({ summary: "Crear un nuevo sentido" })
  @ApiResponse({
    status: 201,
    description: "Sentido creado correctamente."
  })
  @Post("/create-meaning/")
  async createMeaning(@Body() createMeaningDto: any): Promise<any> {
    return this.indicatorsService.createMeaning(createMeaningDto);
  }

  @ApiOperation({ summary: "Obtener todos los sentidos" })
  @ApiResponse({
    status: 200,
    description: "Lista de sentidos."
  })
  @Get("/all-meanings/")
  async findAllMeanings(): Promise<any[]> {
    return this.indicatorsService.findAllMeanings();
  }

  @ApiOperation({ summary: "Obtener sentido por ID" })
  @ApiResponse({
    status: 200,
    description: "Sentido encontrado."
  })
  @Get("/meanings/:id")
  async findMeaningById(@Param("id") id: string): Promise<any> {
    return this.indicatorsService.findMeaningById(Number(id));
  }

  @Put("/update-meaning/:id")
  @ApiOperation({ summary: "Actualizar un sentido" })
  @ApiResponse({
    status: 200,
    description: "Sentido actualizado correctamente."
  })
  async updateMeaning(
    @Param("id") id: string,
    @Body() updateMeaningDto: any
  ): Promise<any> {
    return this.indicatorsService.updateMeaning(Number(id), updateMeaningDto);
  }

  @Delete("/remove-meaning/:id")
  @ApiOperation({ summary: "Eliminar un sentido" })
  @ApiResponse({
    status: 200,
    description: "Sentido eliminado correctamente."
  })
  async removeMeaning(@Param("id") id: string): Promise<{ message: string }> {
    await this.indicatorsService.removeMeaning(Number(id));
    return { message: "Sentido eliminado correctamente." };
  }
}
