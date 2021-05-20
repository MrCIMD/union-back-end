// Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Controllers
import { RoleController } from './role.controller';
// Services
import { RoleService } from './role.service';
// Entities
import { Role } from '../../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule { }
