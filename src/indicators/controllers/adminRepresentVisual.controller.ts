import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  ParseIntPipe
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { adminRepresentVisualService } from "../services/adminRepresentVisual.service";
import {
  CreateRepresentVisualDto,
  CreateRepresentVisualPerIndicatorDto,
  UpdateRepresentVisualDto,
  UpdateVisualPerIndicatorDto
} from "../dto/represent-visual.dto";
import { RepresentVisual } from "../entities/legalRepresentative.entity.ts/visualRepresent.entity";
import { RepresentVisualPorIndicador } from "../entities/legalRepresentative.entity.ts/visualRepresentPerIndicator.entity";

@ApiTags("Admin Represent Visual")
@Controller("represent-visual")
export class AdminRepresentVisualController {
  constructor(private readonly service: adminRepresentVisualService) {}

  // --- RepresentVisual ---
  @Post("/create/represent-visual/")
  @ApiOperation({ summary: "Create visual representative" })
  @ApiResponse({ status: 201, type: RepresentVisual })
  create(@Body() dto: CreateRepresentVisualDto) {
    return this.service.createRepresenVisual(dto);
  }

  @Get("/all-represent-visuals/")
  @ApiOperation({ summary: "Get all visual representatives" })
  @ApiResponse({ status: 200, type: [RepresentVisual] })
  findAll() {
    return this.service.findAllRepresenVisual();
  }

  @Get("/id-represent-visual/:id")
  @ApiOperation({ summary: "Get visual representative by id" })
  @ApiResponse({ status: 200, type: RepresentVisual })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findRepresenVisualById(id);
  }

  @Patch("/update-represent-visual/:id")
  @ApiOperation({ summary: "Update visual representative" })
  @ApiResponse({ status: 200, type: RepresentVisual })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateRepresentVisualDto
  ) {
    return this.service.updateRepresenVisual(id, dto);
  }

  @Delete("/delete-represent-visual/:id")
  @ApiOperation({ summary: "Delete visual representative" })
  @ApiResponse({ status: 204 })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.deleteRepresenVisual(id);
  }

  // --- RepresentVisualPerIndicator ---
  @Post("/create/per-indicator")
  @ApiOperation({ summary: "Create visual representative per indicator" })
  @ApiResponse({ status: 201, type: RepresentVisualPorIndicador })
  createPerIndicator(@Body() dto: CreateRepresentVisualPerIndicatorDto) {
    return this.service.createRepresentVisualPorIndicador(dto);
  }

  @Get("all-per-indicator")
  @ApiOperation({ summary: "Get all visual representative per indicator" })
  @ApiResponse({ status: 200, type: [RepresentVisualPorIndicador] })
  findAllPerIndicator() {
    return this.service.findAllRepresentVisualPorIndicador();
  }

  @Get("/per-indicator/:fkidindicador/:fkidrepresenvisual")
  @ApiOperation({ summary: "Get visual representative per indicator by ids" })
  @ApiResponse({ status: 200, type: RepresentVisualPorIndicador })
  findOnePerIndicator(
    @Param("fkidindicador", ParseIntPipe) fkidindicador: number,
    @Param("fkidrepresenvisual", ParseIntPipe) fkidrepresenvisual: number
  ) {
    return this.service.findRepresentVisualPorIndicadorByIds(
      fkidindicador,
      fkidrepresenvisual
    );
  }

  @Patch("/update-per-indicator/:fkidindicador/:fkidrepresenvisual")
  @ApiOperation({ summary: "Update visual representative per indicator" })
  @ApiResponse({ status: 200, type: RepresentVisualPorIndicador })
  updatePerIndicator(
    @Param("fkidindicador", ParseIntPipe) fkidindicador: number,
    @Param("fkidrepresenvisual", ParseIntPipe) fkidrepresenvisual: number,
    @Body() dto: UpdateVisualPerIndicatorDto
  ) {
    return this.service.updateRepresentVisualPorIndicador(
      fkidindicador,
      fkidrepresenvisual,
      dto
    );
  }

  @Delete("/delete-per-indicator/:fkidindicador/:fkidrepresenvisual")
  @ApiOperation({ summary: "Delete visual representative per indicator" })
  @ApiResponse({ status: 204 })
  removePerIndicator(
    @Param("fkidindicador", ParseIntPipe) fkidindicador: number,
    @Param("fkidrepresenvisual", ParseIntPipe) fkidrepresenvisual: number
  ) {
    return this.service.deleteRepresentVisualPorIndicador(
      fkidindicador,
      fkidrepresenvisual
    );
  }
}
