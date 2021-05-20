import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, Tree, TreeChildren, TreeParent } from "typeorm";
import { Action, Base, Icon, Permission } from "./";

@Entity("routes")
@Tree("closure-table")
export class Route extends Base {
  @Column({ type: "varchar", nullable: false, length: 30 })
  name: string;

  @Column({ type: "varchar", nullable: false })
  url: string;

  @Column({ type: "int", nullable: false })
  level: number;

  @Column({ type: "boolean", nullable: false, default: false })
  isActive: boolean;

  @ManyToOne(() => Icon, role => role.routes, { nullable: true })
  icon: Icon;

  @TreeParent()
  parent: Route;

  @TreeChildren({ cascade: true })
  children: Route[];

  @OneToMany(() => Permission, permission => permission.role, { nullable: true })
  permissions: Permission[];

  @ManyToMany(() => Action, action => action.routes, { cascade: true, nullable: true })
  @JoinTable({ name: "routes_actions" })
  actions: Action[];
}
