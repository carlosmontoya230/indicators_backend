import { Controller } from "@nestjs/common";
import { Body, Post, Get, Param, Put, Delete } from "@nestjs/common";
import { LegalService } from "./legal.service";
import { CreateArticleDto, UpdateArticleDto } from "./dto/createArticle.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("legal")
@Controller("legal")
export class LegalController {
  constructor(private readonly legalService: LegalService) {}

  @ApiOperation({ summary: "Crear artículo" })
  @ApiResponse({ status: 201, description: "Artículo creado correctamente." })
  @Post("/create/article/")
  async createArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.legalService.createArticle(createArticleDto);
  }

  @ApiOperation({ summary: "Obtener todos los artículos" })
  @ApiResponse({ status: 200, description: "Lista de artículos." })
  @Get("/all/articles")
  async findAllArticles() {
    return this.legalService.findAllArticles();
  }

  @ApiOperation({ summary: "Buscar artículo por id" })
  @ApiResponse({ status: 200, description: "Artículo encontrado." })
  @Get("/articles/:id")
  async findOneArticle(@Param("id") id: string) {
    return this.legalService.findOneArticle(id);
  }

  @ApiOperation({ summary: "Actualizar artículo" })
  @ApiResponse({
    status: 200,
    description: "Artículo actualizado correctamente."
  })
  @Put("/update/articles/:id")
  async updateArticle(
    @Param("id") id: string,
    @Body() updateArticleDto: UpdateArticleDto
  ) {
    return this.legalService.updateArticle(id, updateArticleDto);
  }

  @ApiOperation({ summary: "Eliminar artículo" })
  @ApiResponse({
    status: 200,
    description: "Artículo eliminado correctamente."
  })
  @Delete("/delete/articles/:id")
  async removeArticle(@Param("id") id: string) {
    return this.legalService.removeArticle(id);
  }

  @ApiOperation({ summary: "Obtener todos los literales" })
  @ApiResponse({ status: 200, description: "Lista de literales." })
  @Get("/all/literals")
  async getAllLiteral() {
    return this.legalService.getAllLiteral();
  }

  @ApiOperation({ summary: "Obtener todos los numerales" })
  @ApiResponse({ status: 200, description: "Lista de numerales." })
  @Get("/all/numerals")
  async getAllNumeral() {
    return this.legalService.getAllNumeral();
  }

  @ApiOperation({ summary: "Obtener todos los paragrafos" })
  @ApiResponse({ status: 200, description: "Lista de paragrafos." })
  @Get("/all/paragrafos")
  async getAllParagrafo() {
    return this.legalService.getAllParagrafo();
  }
}
