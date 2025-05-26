import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tipoactor")
export class TipoActor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200 })
  nombre: string;
}
