import { Module } from '@nestjs/common';
import { AuthSsoService } from './auth-sso.service';
import { AuthSsoController } from './auth-sso.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSso, AuthSsoSchema } from './entities/auth-sso.entity';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
config();
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthSso.name,
        schema: AuthSsoSchema,
      },
    ]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '10s' },
    }),
  ],
  controllers: [AuthSsoController],
  providers: [AuthSsoService],
})
export class AuthSsoModule {}
