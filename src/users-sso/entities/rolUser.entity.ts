import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Usuario } from "./user.entity";
import { Rol } from "./rol.entity";

@Entity("rol_usuario")
export class RolUsuario {
  @PrimaryColumn({ type: "varchar", length: 100 })
  fkemail: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.rolesUsuario)
  @JoinColumn({ name: "fkemail" })
  usuario: Usuario;

  @PrimaryColumn()
  fkidrol: number;

  @ManyToOne(() => Rol, (rol) => rol.rolesUsuario)
  @JoinColumn({ name: "fkidrol" })
  rol: Rol;
}
