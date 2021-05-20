// Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Controllers
import { ActionController } from './action.controller';
// Services
import { ActionService } from './action.service';
// Entities
import { Action } from '../../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Action]),
  ],
  controllers: [ActionController],
  providers: [ActionService],
})
export class ActionModule {
}
