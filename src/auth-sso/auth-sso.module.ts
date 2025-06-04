import { Module } from "@nestjs/common";
import { AuthSsoController } from "./auth-sso.controller";
import { AuthSsoEntity } from "./entities/auth-sso.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

import { JwtModule } from "@nestjs/jwt";
import { config } from "dotenv";
import { AuthSsoService } from "./auth-sso.service";
import { Actor } from "src/indicators/entities/actors/actor.entity";
import { ResponsablesPorIndicador } from "src/indicators/entities/actors/reponsiblePerIndicator.entity";
import { TipoActor } from "src/indicators/entities/actors/typeActor.entity";
import { Indicador } from "src/indicators/entities/indicator.entity";
import { RepresentVisualPorIndicador } from "src/indicators/entities/legalRepresentative.entity.ts/visualRepresentPerIndicator.entity";
import { Sentido } from "src/indicators/entities/meaning.entity";
import { Frecuencia } from "src/indicators/entities/period.entity";
import { ResultadoIndicador } from "src/indicators/entities/resultsIndicator.entity";
import { Fuente } from "src/indicators/entities/source/source.entity";
import { FuentesPorIndicador } from "src/indicators/entities/source/sourcePerIndicator.entity";
import { TipoIndicador } from "src/indicators/entities/typeIndicator.entity";
import { UnidadMedicion } from "src/indicators/entities/unitOfMeasurement.entity";
import { Articulo } from "src/legal/entities/article.entity";
import { Numeral } from "src/legal/entities/numeral.entity";
import { Paragrafo } from "src/legal/entities/paragraph.entity";
import { Seccion } from "src/legal/entities/section.entity";
import { SubSeccion } from "src/legal/entities/subsection.entity";
import { Rol } from "src/users-sso/entities/rol.entity";
import { RolUsuario } from "src/users-sso/entities/rolUser.entity";
import { Usuario } from "src/users-sso/entities/user.entity";
import { VariablesPorIndicador } from "src/users-sso/entities/variablePerIndicator.entity";
import { Variable } from "src/users-sso/entities/variableUser.entity";
import { UsersService } from "src/users-sso/users.service";
import { JwtStrategy } from "src/common/guards/jwt.strategy";
import { RepresentVisual } from "src/indicators/entities/legalRepresentative.entity.ts/visualRepresent.entity";
import { Literal } from "src/legal/entities/literal.entity";
config();
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Actor,
      TipoActor,
      Articulo,
      Seccion,
      SubSeccion,
      Numeral,
      Paragrafo,
      Indicador,
      TipoIndicador,
      UnidadMedicion,
      Sentido,
      Frecuencia,
      Fuente,
      FuentesPorIndicador,
      RepresentVisual,
      RepresentVisualPorIndicador,
      ResponsablesPorIndicador,
      ResultadoIndicador,
      Rol,
      RolUsuario,
      Usuario,
      Variable,
      VariablesPorIndicador,
      Literal
    ]),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "24h" }
    })
  ],
  controllers: [AuthSsoController],
  providers: [AuthSsoService, UsersService, JwtStrategy]
})
export class AuthSsoModule {}
