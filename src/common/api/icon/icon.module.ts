// Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Controllers
import { IconController } from './icon.controller';
// Services
import { IconService } from './icon.service';
// Entities
import { Icon } from '../../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Icon]),
  ],
  controllers: [IconController],
  providers: [IconService],
})
export class IconModule {
}
