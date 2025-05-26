import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("subseccion")
export class SubSeccion {
  @PrimaryColumn({ type: "varchar", length: 2 })
  id: string;

  @Column({ type: "varchar", length: 100 })
  nombre: string;
}
