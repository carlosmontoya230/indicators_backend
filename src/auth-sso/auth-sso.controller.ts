import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthSsoService } from './auth-sso.service';
import { LoginDto, RegisterDto } from './dto/create-auth-sso.dto';

@Controller('auth-sso')
export class AuthSsoController {
  constructor(private readonly authSsoService: AuthSsoService) {}

  @Post('sing-up')
  async create(@Body() registerDto: RegisterDto, @Res() res) {
    try {
      console.log('entro', registerDto);
      const user = await this.authSsoService.create(registerDto);
      res.status(200).json(user);
      console.log('User registration successful:');
      return user;
    } catch (error) {
      const errorMessage = error.message || 'Error desconocido';
      res.status(error.status || 500).json({ message: errorMessage });
    }
  }

  @Post('login')
  async authenticator(@Body() loginDto: LoginDto, @Res() res) {
    try {
      const userAuth = await this.authSsoService.auth(loginDto);
      res.status(200).json(userAuth);
    } catch (error) {
      const errorMessage = error.message || 'Error desconocido';
      res.status(error.status || 500).json({ message: errorMessage });
    }
  }
}
