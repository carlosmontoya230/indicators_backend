import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("fuente")
export class Fuente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 2000 })
  nombre: string;
}
