import { TypeOrmModule } from "@nestjs/typeorm";

import { Module } from "@nestjs/common";
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
import { AdminActorsController } from "./controllers/adminActors.controller";
import { AdminRepresentVisualController } from "./controllers/adminrepresentvisual.controller";
import { AdminSourceController } from "./controllers/adminSource.controller";
import { Actor } from "./entities/actors/actor.entity";
import { ResponsablesPorIndicador } from "./entities/actors/reponsiblePerIndicator.entity";
import { TipoActor } from "./entities/actors/typeActor.entity";
import { Indicador } from "./entities/indicator.entity";
import { RepresentVisual } from "./entities/legalRepresentative.entity.ts/visualRepresent.entity";
import { RepresentVisualPorIndicador } from "./entities/legalRepresentative.entity.ts/visualRepresentPerIndicator.entity";
import { Sentido } from "./entities/meaning.entity";
import { Frecuencia } from "./entities/period.entity";
import { ResultadoIndicador } from "./entities/resultsIndicator.entity";
import { Fuente } from "./entities/source/source.entity";
import { FuentesPorIndicador } from "./entities/source/sourcePerIndicator.entity";
import { TipoIndicador } from "./entities/typeIndicator.entity";
import { UnidadMedicion } from "./entities/unitOfMeasurement.entity";
import { IndicatorsController } from "./indicators.controller";
import { IndicatorsService } from "./indicators.service";
import { AdminActorsService } from "./services/adminActors.service";
import { AdminSourceService } from "./services/adminSource.service";
import { adminRepresentVisualService } from "./services/adminrepresentvisual.service";

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
      VariablesPorIndicador
    ])
  ],
  controllers: [
    IndicatorsController,
    AdminSourceController,
    AdminActorsController,
    AdminRepresentVisualController
  ],
  providers: [
    IndicatorsService,
    AdminSourceService,
    AdminActorsService,
    adminRepresentVisualService
  ]
})
export class IndicatorsModule {}
