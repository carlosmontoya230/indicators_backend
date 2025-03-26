import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/create-auth-sso.dto';
import { hash, compare } from 'bcrypt';
import { AuthSso, ItemsDocument } from './entities/auth-sso.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthSsoService {
  constructor(
    @InjectModel(AuthSso.name)
    private userModel: Model<ItemsDocument, any>,
    private jwtservice: JwtService,
  ) {}

  async create(registerDto: RegisterDto) {
    try {
      const { password } = registerDto;
      const passwordToHash = await hash(password, 10);
      registerDto = { ...registerDto, password: passwordToHash };
      const createdUser = await this.userModel.create(registerDto);

      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  async auth(loginDto: LoginDto) {
    try {
      console.log('login', loginDto);
      const { email, password } = loginDto;
      const findUser = await this.userModel.findOne({ email: email });

      if (!findUser) {
        throw new HttpException('USER_NOT_FOUND', 404);
      }

      const checkpassword = await compare(password, findUser.password);

      if (!checkpassword) {
        throw new HttpException('PASSWORD_NOT_FOUND', 403);
      }
      const payload = {
        id: findUser._id,
        name: findUser.name,
        email: findUser.email,
      };
      const token = this.jwtservice.sign(payload);

      const data = {
        statusCode: 200,
        user: payload,
        token,
      };
      return data;
    } catch (error) {
      console.error('Error occurred during authentication:', error);
      throw error;
    }
  }
}
