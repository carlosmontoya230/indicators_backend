import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Actor } from "../entities/actors/actor.entity";
import { TipoActor } from "../entities/actors/typeActor.entity";
import {
  CreateActorDto,
  CreateTipoActorDto,
  UpdateActorDto,
  UpdateTipoActorDto
} from "../dto/admin-actors.dto";

@Injectable()
export class AdminActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    @InjectRepository(TipoActor)
    private readonly tipoActorRepository: Repository<TipoActor>
  ) {}

  //* -- Actor ---

  async createActor(dto: CreateActorDto): Promise<Actor> {
    try {
      const tipoActor = await this.tipoActorRepository.findOneBy({
        id: Number(dto.fkidtipoactor)
      });
      if (!tipoActor) {
        throw new BadRequestException(
          `TipoActor with id ${dto.fkidtipoactor} not found`
        );
      }
      const actor = this.actorRepository.create({
        ...dto,
        fkidtipoactor: Number(dto.fkidtipoactor)
      });
      return await this.actorRepository.save(actor);
    } catch (error) {
      throw new BadRequestException(`Error creating actor: ${error.message}`);
    }
  }

  async findAllActors(): Promise<Actor[]> {
    try {
      return await this.actorRepository.find({
        relations: ["tipoActor", "responsablesPorIndicador"]
      });
    } catch (error) {
      throw new BadRequestException(`Error fetching actors: ${error.message}`);
    }
  }

  async findActorById(id: string): Promise<Actor> {
    try {
      const actor = await this.actorRepository.findOne({
        where: { id },
        relations: ["tipoActor", "responsablesPorIndicador"]
      });
      if (!actor) {
        throw new BadRequestException(`Actor with id ${id} not found`);
      }
      return actor;
    } catch (error) {
      throw new BadRequestException(
        `Error fetching actor by id: ${error.message}`
      );
    }
  }

  async updateActor(id: string, dto: UpdateActorDto): Promise<Actor> {
    try {
      const actor = await this.actorRepository.findOneBy({ id });
      if (!actor) {
        throw new BadRequestException(`Actor with id ${id} not found`);
      }
      if (dto.fkidtipoactor) {
        const tipoActor = await this.tipoActorRepository.findOneBy({
          id: Number(dto.fkidtipoactor)
        });
        if (!tipoActor) {
          throw new BadRequestException(
            `TipoActor with id ${dto.fkidtipoactor} not found`
          );
        }
        actor.tipoActor = tipoActor;
        actor.fkidtipoactor = Number(dto.fkidtipoactor);
      }
      if (dto.nombre !== undefined) {
        actor.nombre = dto.nombre;
      }
      // Add other fields from UpdateActorDto as needed
      return await this.actorRepository.save(actor);
    } catch (error) {
      throw new BadRequestException(`Error updating actor: ${error.message}`);
    }
  }

  async deleteActor(id: string): Promise<void> {
    try {
      const actor = await this.actorRepository.findOne({
        where: { id },
        relations: ["responsablesPorIndicador"]
      });
      if (!actor) {
        throw new BadRequestException(`Actor with id ${id} not found`);
      }
      if (
        actor.responsablesPorIndicador &&
        actor.responsablesPorIndicador.length > 0
      ) {
        throw new BadRequestException(
          `Cannot delete actor with id ${id} because it is related to one or more responsablesPorIndicador`
        );
      }
      await this.actorRepository.remove(actor);
    } catch (error) {
      throw new BadRequestException(`Error deleting actor: ${error.message}`);
    }
  }

  //* -- tipo actor ---
  async createTypeActor(dto: CreateTipoActorDto): Promise<TipoActor> {
    try {
      const typeActor = this.tipoActorRepository.create(dto);
      return await this.tipoActorRepository.save(typeActor);
    } catch (error) {
      throw new BadRequestException(
        `Error creating actor type: ${error.message}`
      );
    }
  }

  async findAllTypeActors(): Promise<TipoActor[]> {
    try {
      return await this.tipoActorRepository.find();
    } catch (error) {
      throw new BadRequestException(
        `Error fetching actor types: ${error.message}`
      );
    }
  }

  async findTypeActorById(id: number): Promise<TipoActor> {
    try {
      const typeActor = await this.tipoActorRepository.findOneBy({ id });
      if (!typeActor) {
        throw new BadRequestException(`Type actor with id ${id} not found`);
      }
      return typeActor;
    } catch (error) {
      throw new BadRequestException(
        `Error fetching type actor by id: ${error.message}`
      );
    }
  }
  async updateTypeActor(
    id: number,
    dto: UpdateTipoActorDto
  ): Promise<TipoActor> {
    try {
      const typeActor = await this.tipoActorRepository.findOneBy({ id });
      if (!typeActor) {
        throw new BadRequestException(`Type actor with id ${id} not found`);
      }
      this.tipoActorRepository.merge(typeActor, dto);
      return await this.tipoActorRepository.save(typeActor);
    } catch (error) {
      throw new BadRequestException(
        `Error updating type actor: ${error.message}`
      );
    }
  }

  async deleteTypeActor(id: number): Promise<void> {
    try {
      const typeActor = await this.tipoActorRepository.findOneBy({ id });
      if (!typeActor) {
        throw new BadRequestException(`Type actor with id ${id} not found`);
      }

      const relatedActorsCount = await this.actorRepository.count({
        where: { tipoActor: { id } }
      });
      if (relatedActorsCount > 0) {
        throw new BadRequestException(
          `Cannot delete type actor with id ${id} because it is related to one or more actors`
        );
      }

      await this.tipoActorRepository.remove(typeActor);
    } catch (error) {
      throw new BadRequestException(
        `Error deleting type actor: ${error.message}`
      );
    }
  }
}
