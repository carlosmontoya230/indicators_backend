import { Indicador } from "src/indicators/entities/indicator.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { Variable } from "./variableUser.entity";

@Entity("variablesporindicador")
export class VariablesPorIndicador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fkidvariable: number;

  @ManyToOne(() => Variable)
  @JoinColumn({ name: "fkidvariable" })
  variable: Variable;

  @Column()
  fkidindicador: number;
  @ManyToOne(() => Indicador, (indicador) => indicador.variablesPorIndicador)
  @JoinColumn({ name: "fkidindicador" })
  indicador: Indicador;

  @Column({ type: "float" })
  dato: number;

  @Column({ type: "varchar", length: 100 })
  fkemailusuario: string;

  @Column({ type: "datetime" })
  fechadato: Date;
}
