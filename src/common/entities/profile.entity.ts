import { Entity, Column, OneToOne } from "typeorm";
import { Base, User } from "./";

@Entity("profiles")
export class Profile extends Base {
  @Column({ type: "varchar", nullable: false })
  picture: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  firstname: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  lastname: string;

  @OneToOne(() => User, user => user.profile)
  user: User;
}
