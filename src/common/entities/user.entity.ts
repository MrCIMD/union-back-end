import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Base, Profile, Role } from "./";

@Entity("users")
export class User extends Base {
  @Column({ type: "varchar", nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "varchar", nullable: true })
  rememberToken: string;

  @OneToOne(() => Profile, profile => profile.user, { nullable: false, cascade: true })
  @JoinColumn()
  profile: Profile;

  @ManyToOne(() => Role, role => role.users, { nullable: false })
  role: Role;
}
