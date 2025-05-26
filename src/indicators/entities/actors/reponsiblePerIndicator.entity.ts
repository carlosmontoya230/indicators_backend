import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Indicador } from "../indicator.entity";
import { Actor } from "./actor.entity";

@Entity("responsablesporindicador")
export class ResponsablesPorIndicador {
  @PrimaryColumn({ type: "varchar", length: 50 })
  fkidresponsable: string;

  @PrimaryColumn()
  fkidindicador: number;

  @ManyToOne(() => Indicador, (indicador) => indicador.responsablesPorIndicador)
  @JoinColumn({ name: "fkidindicador" })
  indicador: Indicador;

  @ManyToOne(() => Actor, (actor) => actor.responsablesPorIndicador)
  @JoinColumn({ name: "fkidresponsable" })
  responsable: Actor;

  @Column({ type: "datetime" })
  fechaasignacion: Date;
}
