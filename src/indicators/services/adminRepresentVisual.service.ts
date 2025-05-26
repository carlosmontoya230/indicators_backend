import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Indicador } from "../entities/indicator.entity";
import { RepresentVisual } from "../entities/legalRepresentative.entity.ts/visualRepresent.entity";
import { RepresentVisualPorIndicador } from "../entities/legalRepresentative.entity.ts/visualRepresentPerIndicator.entity";
import {
  CreateRepresentVisualDto,
  CreateRepresentVisualPerIndicatorDto,
  UpdateRepresentVisualDto,
  UpdateVisualPerIndicatorDto
} from "../dto/represent-visual.dto";

@Injectable()
export class adminRepresentVisualService {
  constructor(
    @InjectRepository(RepresentVisual)
    private readonly representVisualRepository: Repository<RepresentVisual>,
    @InjectRepository(RepresentVisualPorIndicador)
    private readonly representVisualPorIndicadorRepository: Repository<RepresentVisualPorIndicador>,
    @InjectRepository(Indicador)
    private readonly indicadorRepository: Repository<Indicador>
  ) {}

  //* -- RepresenVisual ---
  async createRepresenVisual(
    dto: CreateRepresentVisualDto
  ): Promise<RepresentVisual> {
    try {
      const entity = this.representVisualRepository.create(dto);
      return await this.representVisualRepository.save(entity);
    } catch (error) {
      throw new BadRequestException(
        `Error creando representante visual: ${error.message}`
      );
    }
  }

  async findAllRepresenVisual(): Promise<RepresentVisual[]> {
    try {
      return await this.representVisualRepository.find();
    } catch (error) {
      throw new BadRequestException(
        `Error obteniendo representantes visuales: ${error.message}`
      );
    }
  }

  async findRepresenVisualById(id: number): Promise<RepresentVisual> {
    try {
      const entity = await this.representVisualRepository.findOneBy({ id });
      if (!entity)
        throw new NotFoundException(
          `Representante visual con id ${id} no encontrado`
        );
      return entity;
    } catch (error) {
      throw new BadRequestException(
        `Error buscando representante visual: ${error.message}`
      );
    }
  }

  async updateRepresenVisual(
    id: number,
    dto: UpdateRepresentVisualDto
  ): Promise<RepresentVisual> {
    try {
      const entity = await this.representVisualRepository.findOneBy({ id });
      if (!entity)
        throw new NotFoundException(
          `Representante visual con id ${id} no encontrado`
        );
      this.representVisualRepository.merge(entity, dto);
      return await this.representVisualRepository.save(entity);
    } catch (error) {
      throw new BadRequestException(
        `Error actualizando representante visual: ${error.message}`
      );
    }
  }

  async deleteRepresenVisual(id: number): Promise<void> {
    try {
      const relatedCount =
        await this.representVisualPorIndicadorRepository.count({
          where: { fkidrepresenvisual: id }
        });
      if (relatedCount > 0) {
        throw new BadRequestException(
          `No se puede eliminar porque está relacionado con uno o más indicadores`
        );
      }
      const entity = await this.representVisualRepository.findOneBy({ id });
      if (!entity)
        throw new NotFoundException(
          `Representante visual con id ${id} no encontrado`
        );
      await this.representVisualRepository.remove(entity);
    } catch (error) {
      throw new BadRequestException(
        `Error eliminando representante visual: ${error.message}`
      );
    }
  }

  //* -- RepresentVisualPorIndicador ---
  async createRepresentVisualPorIndicador(
    dto: CreateRepresentVisualPerIndicatorDto
  ): Promise<RepresentVisualPorIndicador> {
    try {
      const indicador = await this.indicadorRepository.findOneBy({
        id: dto.fkidindicador
      });
      if (!indicador) throw new NotFoundException("Indicador no encontrado");
      const represenVisual = await this.representVisualRepository.findOneBy({
        id: dto.fkidrepresenvisual
      });
      if (!represenVisual)
        throw new NotFoundException("Representante visual no encontrado");

      const entity = this.representVisualPorIndicadorRepository.create(dto);
      entity.indicador = indicador;
      entity.represenVisual = represenVisual;
      return await this.representVisualPorIndicadorRepository.save(entity);
    } catch (error) {
      throw new BadRequestException(`Error creando relación: ${error.message}`);
    }
  }

  async findAllRepresentVisualPorIndicador(): Promise<
    RepresentVisualPorIndicador[]
  > {
    try {
      return await this.representVisualPorIndicadorRepository.find({
        relations: ["indicador", "represenVisual"]
      });
    } catch (error) {
      throw new BadRequestException(
        `Error obteniendo relaciones: ${error.message}`
      );
    }
  }

  async findRepresentVisualPorIndicadorByIds(
    fkidindicador: number,
    fkidrepresenvisual: number
  ): Promise<RepresentVisualPorIndicador> {
    try {
      const entity = await this.representVisualPorIndicadorRepository.findOne({
        where: { fkidindicador, fkidrepresenvisual },
        relations: ["indicador", "represenVisual"]
      });
      if (!entity) throw new NotFoundException("Relación no encontrada");
      return entity;
    } catch (error) {
      throw new BadRequestException(
        `Error buscando relación: ${error.message}`
      );
    }
  }

  async updateRepresentVisualPorIndicador(
    fkidindicador: number,
    fkidrepresenvisual: number,
    dto: UpdateVisualPerIndicatorDto
  ): Promise<RepresentVisualPorIndicador> {
    try {
      const entity = await this.findRepresentVisualPorIndicadorByIds(
        fkidindicador,
        fkidrepresenvisual
      );
      if (dto.fkidindicador) {
        const indicador = await this.indicadorRepository.findOneBy({
          id: dto.fkidindicador
        });
        if (!indicador) throw new NotFoundException("Indicador no encontrado");
        entity.indicador = indicador;
        entity.fkidindicador = dto.fkidindicador;
      }
      if (dto.fkidrepresenvisual) {
        const represenVisual = await this.representVisualRepository.findOneBy({
          id: dto.fkidrepresenvisual
        });
        if (!represenVisual)
          throw new NotFoundException("Representante visual no encontrado");
        entity.represenVisual = represenVisual;
        entity.fkidrepresenvisual = dto.fkidrepresenvisual;
      }
      return await this.representVisualPorIndicadorRepository.save(entity);
    } catch (error) {
      throw new BadRequestException(
        `Error actualizando relación: ${error.message}`
      );
    }
  }

  async deleteRepresentVisualPorIndicador(
    fkidindicador: number,
    fkidrepresenvisual: number
  ): Promise<void> {
    try {
      const entity = await this.findRepresentVisualPorIndicadorByIds(
        fkidindicador,
        fkidrepresenvisual
      );
      await this.representVisualPorIndicadorRepository.remove(entity);
    } catch (error) {
      throw new BadRequestException(
        `Error eliminando relación: ${error.message}`
      );
    }
  }
}
