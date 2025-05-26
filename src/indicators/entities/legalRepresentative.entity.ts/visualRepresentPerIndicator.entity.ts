import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Indicador } from "../indicator.entity";
import { RepresentVisual } from "./visualRepresent.entity";

@Entity("represenvisualporindicador")
export class RepresentVisualPorIndicador {
  @PrimaryColumn()
  fkidindicador: number;
  @ManyToOne(
    () => Indicador,
    (indicador) => indicador.representVisualPorIndicador
  )
  @JoinColumn({ name: "fkidindicador" })
  indicador: Indicador;

  @PrimaryColumn()
  fkidrepresenvisual: number;
  @ManyToOne(() => RepresentVisual)
  @JoinColumn({ name: "fkidrepresenvisual" })
  represenVisual: RepresentVisual;
}
