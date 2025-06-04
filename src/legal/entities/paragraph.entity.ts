import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("paragrafo")
export class Paragrafo {
  @PrimaryColumn({ type: "varchar", length: 20 })
  id: string;

  @Column({ type: "varchar", length: 4000 })
  descripcion: string;

  @Column({ type: "varchar", length: 20 })
  fkidarticulo: string;
}
