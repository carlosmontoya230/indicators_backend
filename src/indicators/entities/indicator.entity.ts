import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { TipoIndicador } from "./typeIndicator.entity";
import { UnidadMedicion } from "./unitOfMeasurement.entity";
import { Sentido } from "./meaning.entity";
import { RepresentVisualPorIndicador } from "./legalRepresentative.entity.ts/visualRepresentPerIndicator.entity";
import { ResponsablesPorIndicador } from "./actors/reponsiblePerIndicator.entity";
import { FuentesPorIndicador } from "./source/sourcePerIndicator.entity";
import { VariablesPorIndicador } from "src/users-sso/entities/variablePerIndicator.entity";
import { ResultadoIndicador } from "./resultsIndicator.entity";

@Entity()
export class Indicador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50 })
  codigo: string;

  @Column({ type: "varchar", length: 100 })
  nombre: string;

  @Column({ type: "varchar", length: 4000 })
  objetivo: string;

  @Column({ type: "varchar", length: 1000 })
  alcance: string;

  @Column({ type: "varchar", length: 1000 })
  formula: string;

  @Column()
  fkidtipoindicador: number;
  @ManyToOne(() => TipoIndicador)
  @JoinColumn({ name: "fkidtipoindicador" })
  tipoIndicador: TipoIndicador;

  @Column()
  fkidunidadmedicion: number;
  @ManyToOne(() => UnidadMedicion)
  @JoinColumn({ name: "fkidunidadmedicion" })
  unidadMedicion: UnidadMedicion;

  @Column({ type: "varchar", length: 1000 })
  meta: string;

  @Column()
  fkidsentido: number;
  @ManyToOne(() => Sentido)
  @JoinColumn({ name: "fkidsentido" })
  sentido: Sentido;

  @Column()
  fkidfrecuencia: number;

  @Column({ type: "varchar", length: 20, nullable: true })
  fkidarticulo: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  fkidliteral: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  fkidnumeral: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  fkidparagrafo: string;

  @OneToMany(() => RepresentVisualPorIndicador, (rvi) => rvi.indicador)
  representVisualPorIndicador: RepresentVisualPorIndicador[];

  @OneToMany(() => ResponsablesPorIndicador, (rpi) => rpi.indicador)
  responsablesPorIndicador: ResponsablesPorIndicador[];

  @OneToMany(() => FuentesPorIndicador, (fpi) => fpi.indicador)
  fuentesPorIndicador: FuentesPorIndicador[];

  @OneToMany(() => VariablesPorIndicador, (vpi) => vpi.indicador)
  variablesPorIndicador: VariablesPorIndicador[];

  @OneToMany(() => ResultadoIndicador, (ri) => ri.indicador)
  resultadosIndicador: ResultadoIndicador[];
}
