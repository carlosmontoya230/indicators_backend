import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tipoindicador")
export class TipoIndicador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200 })
  nombre: string;
}
