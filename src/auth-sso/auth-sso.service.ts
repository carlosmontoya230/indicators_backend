import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginDto, RegisterDto } from "./dto/create-auth-sso.dto";
import { hash, compare } from "bcrypt";
import { AuthSso } from "./entities/auth-sso.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthSsoService {
  constructor(
    @InjectRepository(AuthSso)
    private readonly userRepository: Repository<AuthSso>,
    private jwtService: JwtService
  ) {}

  async create(registerDto: RegisterDto) {
    try {
      const { email, password, name } = registerDto;

      // Verificar si el usuario ya existe
      const existingUser = await this.userRepository.findOne({
        where: { email }
      });
      if (existingUser) {
        throw new HttpException("USER_ALREADY_EXISTS", 400);
      }

      // Hashear contraseña
      const hashedPassword = await hash(password, 10);
      const newUser = this.userRepository.create({
        email,
        name,
        password: hashedPassword
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      throw error;
    }
  }

  async auth(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;

      const findUser = await this.userRepository.findOne({ where: { email } });
      if (!findUser) {
        throw new HttpException("USER_NOT_FOUND", 404);
      }

      const isPasswordValid = await compare(password, findUser.password);
      if (!isPasswordValid) {
        throw new HttpException("INVALID_PASSWORD", 403);
      }

      const payload = {
        id: findUser.id,
        name: findUser.name,
        email: findUser.email
      };
      const token = this.jwtService.sign(payload);

      return {
        statusCode: 200,
        user: payload,
        token
      };
    } catch (error) {
      console.error("Error during authentication:", error);
      throw error;
    }
  }
}
