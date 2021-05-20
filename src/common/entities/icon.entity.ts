import { Column, Entity, OneToMany } from "typeorm";
import { Action, Base, Route } from "./";

@Entity("icons")
export class Icon extends Base {
  @Column("varchar", { nullable: false })
  name: string;

  @Column("varchar", { nullable: false })
  path: string;

  @OneToMany(() => Action, action => action.icon, { nullable: true })
  actions: Action[];

  @OneToMany(() => Route, route => route.icon, { nullable: true })
  routes: Route[];
}
