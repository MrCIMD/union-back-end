import { Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Action, Role, Route, Base } from "./";

@Entity("permissions")
export class Permission extends Base {
  @ManyToOne(() => Role, role => role.permissions, { nullable: false })
  role: Role;

  @ManyToOne(() => Route, route => route.permissions, { nullable: false })
  route: Route;

  @ManyToMany(() => Action, action => action.permission, { cascade: true, nullable: true })
  @JoinTable({ name: "permissions_actions" })
  actions: Action[];
}
