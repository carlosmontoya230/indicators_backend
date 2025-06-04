import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppService } from "./app.service";
import { RolesGuard } from "./common/guards/rolesguard.service";

import { AppController } from "./app.controller";
import { AuthSsoModule } from "./auth-sso/auth-sso.module";
import { JwtStrategy } from "./common/guards/jwt.strategy";
import { Actor } from "./indicators/entities/actors/actor.entity";
import { ResponsablesPorIndicador } from "./indicators/entities/actors/reponsiblePerIndicator.entity";
import { TipoActor } from "./indicators/entities/actors/typeActor.entity";
import { Indicador } from "./indicators/entities/indicator.entity";
import { RepresentVisual } from "./indicators/entities/legalRepresentative.entity.ts/visualRepresent.entity";
import { RepresentVisualPorIndicador } from "./indicators/entities/legalRepresentative.entity.ts/visualRepresentPerIndicator.entity";
import { Sentido } from "./indicators/entities/meaning.entity";
import { Frecuencia } from "./indicators/entities/period.entity";
import { ResultadoIndicador } from "./indicators/entities/resultsIndicator.entity";
import { Fuente } from "./indicators/entities/source/source.entity";
import { FuentesPorIndicador } from "./indicators/entities/source/sourcePerIndicator.entity";
import { TipoIndicador } from "./indicators/entities/typeIndicator.entity";
import { UnidadMedicion } from "./indicators/entities/unitOfMeasurement.entity";
import { IndicatorsModule } from "./indicators/indicators.module";
import { Articulo } from "./legal/entities/article.entity";
import { Numeral } from "./legal/entities/numeral.entity";
import { Paragrafo } from "./legal/entities/paragraph.entity";
import { Seccion } from "./legal/entities/section.entity";
import { SubSeccion } from "./legal/entities/subsection.entity";
import { LegalModule } from "./legal/legal.module";
import { Rol } from "./users-sso/entities/rol.entity";
import { RolUsuario } from "./users-sso/entities/rolUser.entity";
import { Usuario } from "./users-sso/entities/user.entity";
import { VariablesPorIndicador } from "./users-sso/entities/variablePerIndicator.entity";
import { Variable } from "./users-sso/entities/variableUser.entity";
import { UsersModule } from "./users-sso/users.module";
import { Literal } from "./legal/entities/literal.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      options: {
        encrypt: process.env.DB_ENCRYPT === "true",
        trustServerCertificate:
          process.env.DB_TRUST_SERVER_CERTIFICATE === "true",
        enableArithAbort: true
      },
      synchronize: false,
      entities: [
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
      ]
    }),
    UsersModule,
    IndicatorsModule,
    LegalModule,
    AuthSsoModule
  ],
  controllers: [AppController],
  providers: [RolesGuard, AppService, JwtStrategy]
})
export class AppModule {}
