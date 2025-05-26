import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Articulo } from "./entities/article.entity";
import { CreateArticleDto, UpdateArticleDto } from "./dto/createArticle.dto";

@Injectable()
export class LegalService {
  @InjectRepository(Articulo)
  private readonly articuloRepository: Repository<Articulo>;

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
}
