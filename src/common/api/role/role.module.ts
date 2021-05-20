// Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
// Controllers
import { RoleController } from './role.controller';
// Services
import { RoleService } from './role.service';
// Entities
import { Role } from '../../entities';
import { RoleDto } from './role.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Role])],
      resolvers: [
        {
          DTOClass: RoleDto,
          EntityClass: Role,
          enableSubscriptions: true
        },
      ],
    }),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule { }
