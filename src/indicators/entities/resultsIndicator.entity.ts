import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { Indicador } from "./indicator.entity";

@Entity("resultadoindicador")
export class ResultadoIndicador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float" })
  resultado: number;

  @Column({ type: "datetime" })
  fechacalculo: Date;

  @Column()
  fkidindicador: number;
  @ManyToOne(() => Indicador, (indicador) => indicador.resultadosIndicador)
  @JoinColumn({ name: "fkidindicador" })
  indicador: Indicador;
}
