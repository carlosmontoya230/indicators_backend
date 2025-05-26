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
import { Rol } from "src/users-sso/entities/rol.entity";
import { RolUsuario } from "src/users-sso/entities/rolUser.entity";
import { Usuario } from "src/users-sso/entities/user.entity";
import { VariablesPorIndicador } from "src/users-sso/entities/variablePerIndicator.entity";
import { Variable } from "src/users-sso/entities/variableUser.entity";
import { Articulo } from "./entities/article.entity";
import { Numeral } from "./entities/numeral.entity";
import { Paragrafo } from "./entities/paragraph.entity";
import { Seccion } from "./entities/section.entity";
import { SubSeccion } from "./entities/subsection.entity";
import { LegalController } from "./legal.controller";
import { LegalService } from "./legal.service";
import { Module } from "@nestjs/common";
import { RepresentVisual } from "src/indicators/entities/legalRepresentative.entity.ts/visualRepresent.entity";

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
  controllers: [LegalController],
  providers: [LegalService]
})
export class LegalModule {}
