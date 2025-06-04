import { TypeOrmModule } from "@nestjs/typeorm";
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
import { Rol } from "./entities/rol.entity";
import { RolUsuario } from "./entities/rolUser.entity";
import { Usuario } from "./entities/user.entity";
import { VariablesPorIndicador } from "./entities/variablePerIndicator.entity";
import { Variable } from "./entities/variableUser.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

import { Module } from "@nestjs/common";
import { JwtStrategy } from "src/common/guards/jwt.strategy";
import { RepresentVisual } from "src/indicators/entities/legalRepresentative.entity.ts/visualRepresent.entity";
import { Literal } from "src/legal/entities/literal.entity";

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
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy]
})
export class UsersModule {}
