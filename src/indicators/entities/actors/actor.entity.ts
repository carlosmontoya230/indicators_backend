import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany
} from "typeorm";
import { TipoActor } from "./typeActor.entity";
import { ResponsablesPorIndicador } from "./reponsiblePerIndicator.entity";

@Entity("actor")
export class Actor {
  @PrimaryColumn({ type: "varchar", length: 50 })
  id: string;

  @Column({ type: "varchar", length: 200 })
  nombre: string;

  @Column()
  fkidtipoactor: number;

  @ManyToOne(() => TipoActor)
  @JoinColumn({ name: "fkidtipoactor" })
  tipoActor: TipoActor;

  @OneToMany(() => ResponsablesPorIndicador, (rpi) => rpi.responsable)
  responsablesPorIndicador: ResponsablesPorIndicador[];
}
