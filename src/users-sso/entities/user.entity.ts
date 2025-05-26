import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { RolUsuario } from "./rolUser.entity";

@Entity("usuario")
export class Usuario {
  @PrimaryColumn({ type: "varchar", length: 100 })
  email: string;

  @Column({ type: "varchar", length: 100 })
  contrasena: string;

  @OneToMany(() => RolUsuario, (ru) => ru.usuario)
  rolesUsuario: RolUsuario[];
}
