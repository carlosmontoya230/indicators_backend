import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import { Rol } from "./entities/rol.entity";
import { RolUsuario } from "./entities/rolUser.entity";
import { Usuario } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(RolUsuario)
    private readonly rolUsuarioRepository: Repository<RolUsuario>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>
  ) {}

  async createUser(email: string, contrasena: string, roles: number[]) {
    try {
      // Verificar si el email ya existe
      const existingUser = await this.usuarioRepository.findOne({
        where: { email }
      });
      if (existingUser) {
        throw new BadRequestException("El email ya está registrado.");
      }

      const hashedPassword = await bcrypt.hash(contrasena, 10);
      const usuario = this.usuarioRepository.create({
        email,
        contrasena: hashedPassword
      });
      await this.usuarioRepository.save(usuario);

      for (const rolId of roles) {
        const rolUsuario = this.rolUsuarioRepository.create({
          fkemail: email,
          fkidrol: rolId
        });
        await this.rolUsuarioRepository.save(rolUsuario);
      }
      return await this.findOne(email);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.usuarioRepository.find({
        relations: ["rolesUsuario", "rolesUsuario.rol"]
      });
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  async findOne(email: string) {
    try {
      return await this.usuarioRepository.findOne({
        where: { email },
        relations: ["rolesUsuario", "rolesUsuario.rol"]
      });
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  async updateUser(email: string, data: Partial<Usuario>) {
    try {
      if (data.contrasena) {
        data.contrasena = await bcrypt.hash(data.contrasena, 10);
      }
      await this.usuarioRepository.update(email, data);
      return await this.findOne(email);
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async removeUser(email: string) {
    try {
      return await this.usuarioRepository.delete(email);
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  // -------------

  async createRol(nombre: string) {
    try {
      const rol = this.rolRepository.create({ nombre });
      return await this.rolRepository.save(rol);
    } catch (error) {
      throw new Error(`Error creating rol: ${error.message}`);
    }
  }

  async findAllRoles() {
    try {
      return await this.rolRepository.find();
    } catch (error) {
      throw new Error(`Error fetching roles: ${error.message}`);
    }
  }
}
