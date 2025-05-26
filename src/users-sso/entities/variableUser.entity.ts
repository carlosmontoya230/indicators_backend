import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("variable")
export class Variable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200 })
  nombre: string;

  @Column({ type: "datetime" })
  fechacreacion: Date;

  @Column({ type: "varchar", length: 100 })
  fkemailusuario: string;
}
