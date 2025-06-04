import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Articulo } from "./entities/article.entity";
import { CreateArticleDto, UpdateArticleDto } from "./dto/createArticle.dto";
import { Literal } from "./entities/literal.entity";
import { Numeral } from "./entities/numeral.entity";
import { Paragrafo } from "./entities/paragraph.entity";

@Injectable()
export class LegalService {
  constructor(
    @InjectRepository(Articulo)
    private readonly articuloRepository: Repository<Articulo>,

    @InjectRepository(Literal)
    private readonly literalRepository: Repository<Literal>,
    @InjectRepository(Numeral)
    private readonly numeralRepository: Repository<Numeral>,
    @InjectRepository(Paragrafo)
    private readonly paragrafoRepository: Repository<Paragrafo>
  ) {}

  async createArticle(createArticleDto: CreateArticleDto) {
    try {
      return await this.articuloRepository.save(createArticleDto);
    } catch (error) {
      throw new Error(`Error creating article: ${error.message}`);
    }
  }

  async findAllArticles() {
    try {
      return await this.articuloRepository.find({
        relations: ["seccion", "subSeccion"]
      });
    } catch (error) {
      throw new Error(`Error finding all articles: ${error.message}`);
    }
  }

  async findOneArticle(id: string) {
    try {
      return await this.articuloRepository.findOne({
        where: { id },
        relations: ["seccion", "subSeccion"]
      });
    } catch (error) {
      throw new Error(`Error finding article with id ${id}: ${error.message}`);
    }
  }

  async updateArticle(id: string, updateArticleDto: UpdateArticleDto) {
    try {
      await this.articuloRepository.update(id, updateArticleDto);
      return await this.findOneArticle(id);
    } catch (error) {
      throw new Error(`Error updating article with id ${id}: ${error.message}`);
    }
  }

  async removeArticle(id: string) {
    try {
      return await this.articuloRepository.delete(id);
    } catch (error) {
      throw new Error(`Error removing article with id ${id}: ${error.message}`);
    }
  }

  async getAllLiteral() {
    try {
      return await this.literalRepository.find();
    } catch (error) {
      throw new Error(`Error getting all literals: ${error.message}`);
    }
  }

  async getAllNumeral() {
    try {
      return await this.numeralRepository.find();
    } catch (error) {
      throw new Error(`Error getting all numerals: ${error.message}`);
    }
  }

  async getAllParagrafo() {
    try {
      return await this.paragrafoRepository.find();
    } catch (error) {
      throw new Error(`Error getting all paragrafos: ${error.message}`);
    }
  }
}
