// Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Controllers
import { ProfileController } from './profile.controller';
// Services
import { ProfileService } from './profile.service';
// Entities
import { Profile } from '../../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule { }
