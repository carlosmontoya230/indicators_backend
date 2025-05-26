import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("seccion")
export class Seccion {
  @PrimaryColumn({ type: "varchar", length: 2 })
  id: string;

  @Column({ type: "varchar", length: 200 })
  nombre: string;
}
