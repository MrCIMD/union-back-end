// Modules
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
// Controllers
import { RouteController } from "./route.controller";
// Services
import { RouteService } from "./route.service";
// Entities
import { Route } from "../../entities";

@Module({
  imports: [
    TypeOrmModule.forFeature([Route])
  ],
  controllers: [RouteController],
  providers: [RouteService]
})
export class RouteModule {
}
