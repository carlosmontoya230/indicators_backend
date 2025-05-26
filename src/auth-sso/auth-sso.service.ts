import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginDto, RegisterDto } from "./dto/create-auth-sso.dto";
import { hash, compare } from "bcrypt";
import { AuthSsoEntity } from "./entities/auth-sso.entity";
import { JwtService } from "@nestjs/jwt";
import { Usuario } from "src/users-sso/entities/user.entity";
import { UsersService } from "src/users-sso/users.service";

@Injectable()
export class AuthSsoService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  // async create(registerDto: RegisterDto) {
  //   try {
  //     const { email, password, name } = registerDto;

  //     // Verificar si el usuario ya existe
  //     const existingUser = await this.usuarioRepository.findOne({
  //       where: { email }
  //     });
  //     if (existingUser) {
  //       throw new HttpException("USER_ALREADY_EXISTS", 400);
  //     }

  //     // Hashear contraseña
  //     const hashedPassword = await hash(password, 10);
  //     const newUser = this.usuarioRepository.create({
  //       email,
  //       name,
  //       password: hashedPassword
  //     });

  //     return await this.usuarioRepository.save(newUser);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async auth(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;

      const findUser = await this.usersService.findOne(email);
      if (!findUser) {
        throw new HttpException("USER_NOT_FOUND", 404);
      }

      const isPasswordValid = await compare(password, findUser.contrasena);
      if (!isPasswordValid) {
        throw new HttpException("INVALID_PASSWORD", 403);
      }

      const roles = findUser.rolesUsuario.map((ru) => ru.rol.nombre);

      const payload = {
        email: findUser.email,
        roles
      };

      const token = this.jwtService.sign(payload);

      return {
        statusCode: 200,
        user: payload,
        token
      };
    } catch (error) {
      throw error;
    }
  }
}
