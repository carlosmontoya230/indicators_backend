import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class AuthSsoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float" })
  name: string;

  @Column({ type: "float" })
  email: string;

  @Column({ type: "float" })
  password: string;
}
