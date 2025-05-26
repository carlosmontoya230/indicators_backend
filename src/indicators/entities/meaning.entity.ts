import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("sentido")
export class Sentido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200 })
  nombre: string;
}
