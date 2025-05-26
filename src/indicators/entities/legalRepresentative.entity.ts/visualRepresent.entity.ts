import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("represenvisual")
export class RepresentVisual {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  nombre: string;
}
