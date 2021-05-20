// Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Controllers
import { PermissionController } from './permission.controller';
// Services
import { PermissionService } from './permission.service';
// Entities
import { Permission } from '../../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule { }
