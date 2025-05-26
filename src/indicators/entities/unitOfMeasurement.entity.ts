import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("unidadmedicion")
export class UnidadMedicion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200 })
  descripcion: string;
}
