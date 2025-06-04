import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("literal")
export class Literal {
  @PrimaryColumn({ type: "varchar", length: 20 })
  id: string;

  @Column({ type: "varchar", length: 1000 })
  descripcion: string;

  @Column({ type: "varchar", length: 20 })
  fkidarticulo: string;
}
