import { Module } from "@nestjs/common";
import { ActionModule } from "./api/action/action.module";
import { AuthModule } from "./api/auth/auth.module";
import { PermissionModule } from "./api/permission/permission.module";
import { ProfileModule } from "./api/profile/profile.module";
import { RoleModule } from "./api/role/role.module";
import { RouteModule } from "./api/route/route.module";
import { IconModule } from "./api/icon/icon.module";

@Module({
  imports: [
    ActionModule,
    AuthModule,
    IconModule,
    PermissionModule,
    ProfileModule,
    RoleModule,
    RouteModule
  ]
})
export class CommonModule {
}
