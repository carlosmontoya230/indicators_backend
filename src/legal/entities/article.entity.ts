import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Seccion } from "./section.entity";
import { SubSeccion } from "./subsection.entity";

@Entity("articulo")
export class Articulo {
  @PrimaryColumn({ type: "varchar", length: 20 })
  id: string;

  @Column({ type: "varchar", length: 1000 })
  nombre: string;

  @Column({ type: "varchar", length: 4000 })
  descripcion: string;

  @Column()
  fkidseccion: string;

  @ManyToOne(() => Seccion)
  @JoinColumn({ name: "fkidseccion" })
  seccion: Seccion;

  @Column()
  fkidsubseccion: string;

  @ManyToOne(() => SubSeccion)
  @JoinColumn({ name: "fkidsubseccion" })
  subSeccion: SubSeccion;
}
