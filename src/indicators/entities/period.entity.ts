import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Frecuencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200 })
  nombre: string;
}
