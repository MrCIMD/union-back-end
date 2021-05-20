import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { Permission, Base, Icon, Route } from "./";

@Entity("actions")
export class Action extends Base {
  @Column("varchar", { nullable: false, length: 30 })
  name: string;

  @Column("varchar", { nullable: false })
  description: string;

  @Column("boolean", { nullable: false, default: false })
  isDefault: boolean;

  @ManyToOne(() => Icon, role => role.actions, { nullable: true })
  icon: Icon;

  @ManyToMany(() => Permission, permission => permission.actions, { cascade: true })
  permission: Permission[];

  @ManyToMany(() => Route, route => route.actions, { cascade: true })
  routes: Route[];
}
