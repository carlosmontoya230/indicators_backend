import { Module } from "@nestjs/common";
import { AuthSsoController } from "./auth-sso.controller";
import { AuthSso } from "./entities/auth-sso.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

import { JwtModule } from "@nestjs/jwt";
import { config } from "dotenv";
import { AuthSsoService } from "./auth-sso.service";
config();
@Module({
  imports: [
    TypeOrmModule.forFeature([AuthSso]),

    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: "1h" }
    })
  ],
  controllers: [AuthSsoController],
  providers: [AuthSsoService]
})
export class AuthSsoModule {}
