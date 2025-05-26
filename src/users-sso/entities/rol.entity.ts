import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RolUsuario } from "./rolUser.entity";

@Entity("rol")
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  nombre: string;

  @OneToMany(() => RolUsuario, (ru) => ru.rol)
  rolesUsuario: RolUsuario[];
}
