import { Column, Entity, OneToMany } from "typeorm";
import { Base, Permission, User } from "./";

@Entity("roles")
export class Role extends Base {
  @Column({ type: "varchar", nullable: false, length: 20, unique: true })
  name: string;

  @Column({ type: "varchar", nullable: false })
  description: string;

  @OneToMany(() => User, user => user.role, { nullable: true })
  users: User[];

  @OneToMany(() => Permission, permission => permission.role, { nullable: true, cascade: true })
  permissions: Permission[];
}
