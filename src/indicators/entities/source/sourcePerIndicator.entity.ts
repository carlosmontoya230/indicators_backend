import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Indicador } from "../indicator.entity";
import { Fuente } from "./source.entity";

@Entity("fuentesporindicador")
export class FuentesPorIndicador {
  @PrimaryColumn()
  fkidfuente: number;
  @ManyToOne(() => Fuente)
  @JoinColumn({ name: "fkidfuente" })
  fuente: Fuente;

  @PrimaryColumn()
  fkidindicador: number;

  @ManyToOne(() => Indicador, (indicador) => indicador.fuentesPorIndicador)
  @JoinColumn({ name: "fkidindicador" })
  indicador: Indicador;
}
