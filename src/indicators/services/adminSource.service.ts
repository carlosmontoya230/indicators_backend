import {
  Injectable,
  NotFoundException,
  BadRequestException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Fuente } from "../entities/source/source.entity";
import { CreateFuenteDto } from "../dto/create-fuente.dto";
import {
  CreateFuentesPorIndicadorDto,
  UpdateFuenteDto,
  UpdateFuentesPorIndicadorDto
} from "../dto/update-fuente.dto";
import { FuentesPorIndicador } from "../entities/source/sourcePerIndicator.entity";
import { Indicador } from "../entities/indicator.entity";

@Injectable()
export class AdminSourceService {
  constructor(
    @InjectRepository(Fuente)
    private readonly sourceRepository: Repository<Fuente>,
    @InjectRepository(FuentesPorIndicador)
    private readonly spiRepository: Repository<FuentesPorIndicador>,
    @InjectRepository(Indicador)
    private readonly indicatorRepository: Repository<Indicador>
  ) {}

  //* -- fuente ---

  async createSource(createSourceDto: CreateFuenteDto): Promise<Fuente> {
    try {
      const source = this.sourceRepository.create(createSourceDto);
      return await this.sourceRepository.save(source);
    } catch (error) {
      throw new BadRequestException(`Error creating source: ${error.message}`);
    }
  }

  async findAllSources(): Promise<Fuente[]> {
    try {
      return await this.sourceRepository.find();
    } catch (error) {
      throw new BadRequestException(`Error getting sources: ${error.message}`);
    }
  }

  async findOneSource(id: number): Promise<Fuente> {
    try {
      const source = await this.sourceRepository.findOne({ where: { id } });
      if (!source) throw new NotFoundException("Source not found");
      return source;
    } catch (error) {
      throw new BadRequestException(`Error finding source: ${error.message}`);
    }
  }

  async updateSource(
    id: number,
    updateSourceDto: UpdateFuenteDto
  ): Promise<Fuente> {
    try {
      const source = await this.sourceRepository.findOne({ where: { id } });
      if (!source) throw new NotFoundException("Source not found");
      await this.sourceRepository.update(id, updateSourceDto);
      return await this.sourceRepository.findOne({ where: { id } });
    } catch (error) {
      throw new BadRequestException(`Error updating source: ${error.message}`);
    }
  }

  async removeSource(id: number): Promise<void> {
    try {
      const relatedCount = await this.spiRepository.count({
        where: { fkidfuente: id }
      });
      if (relatedCount > 0) {
        throw new BadRequestException(
          "Cannot delete source: it is related to one or more indicators"
        );
      }

      const result = await this.sourceRepository.delete(id);
      if (result.affected === 0)
        throw new NotFoundException("Source not found");
    } catch (error) {
      throw new BadRequestException(`Error deleting source: ${error.message}`);
    }
  }

  //* -- fuente por indicador --

  async createSourcePerIndicator(
    dto: CreateFuentesPorIndicadorDto
  ): Promise<FuentesPorIndicador> {
    try {
      const source = await this.findOneSource(dto.fkidfuente);

      if (!source) {
        throw new NotFoundException("Source not found");
      }

      const indicator = await this.indicatorRepository.findOne({
        where: { id: dto.fkidindicador }
      });

      if (!indicator) {
        throw new NotFoundException("Indicator not found");
      }

      const entity = this.spiRepository.create(dto);
      return await this.spiRepository.save(entity);
    } catch (error) {
      throw new BadRequestException(
        `Error creating relation: ${error.message}`
      );
    }
  }

  async findAllSourcesPerIndicator(): Promise<FuentesPorIndicador[]> {
    try {
      return await this.spiRepository.find({
        relations: ["fuente", "indicador"]
      });
    } catch (error) {
      throw new BadRequestException(
        `Error getting relations: ${error.message}`
      );
    }
  }

  async findOneSourcePerIndicator(
    sourceId: number,
    indicatorId: number
  ): Promise<FuentesPorIndicador> {
    try {
      const entity = await this.spiRepository.findOne({
        where: { fkidfuente: sourceId, fkidindicador: indicatorId },
        relations: ["fuente", "indicador"]
      });
      if (!entity) throw new NotFoundException("Relation not found");
      return entity;
    } catch (error) {
      throw new BadRequestException(`Error finding relation: ${error.message}`);
    }
  }

  async updateSourcePerIndicator(
    sourceId: number,
    indicatorId: number,
    dto: UpdateFuentesPorIndicadorDto
  ): Promise<FuentesPorIndicador> {
    try {
      const entity = await this.findOneSourcePerIndicator(
        sourceId,
        indicatorId
      );
      if (!entity) throw new NotFoundException("Relation not found");

      await this.spiRepository.update(
        { fkidfuente: sourceId, fkidindicador: indicatorId },
        dto
      );

      return await this.findOneSourcePerIndicator(
        dto.fkidfuente ?? sourceId,
        dto.fkidindicador ?? indicatorId
      );
    } catch (error) {
      throw new BadRequestException(
        `Error updating relation: ${error.message}`
      );
    }
  }

  async removeSourcePerIndicator(
    sourceId: number,
    indicatorId: number
  ): Promise<void> {
    try {
      const result = await this.spiRepository.delete({
        fkidfuente: sourceId,
        fkidindicador: indicatorId
      });
      if (result.affected === 0)
        throw new NotFoundException("Relation not found");
    } catch (error) {
      throw new BadRequestException(
        `Error deleting relation: ${error.message}`
      );
    }
  }
}
