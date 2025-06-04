import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("numeral")
export class Numeral {
  @PrimaryColumn({ type: "varchar", length: 20 })
  id: string;

  @Column({ type: "varchar", length: 1000 })
  descripcion: string;

  @Column({ type: "varchar", length: 20 })
  fkidliteral: string;
}
