import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { RoleService } from './role.service';
import { Role } from "../../entities";

@Crud({
  model: {
    type: Role,
  },
  query: {
    filter: {
      deletedAt: {
        $eq: null
      }
    },
    join: {
      users: { eager: false },
      'users.profile': { eager: false },
      'users.role': { eager: false },
      permissions: { eager: false },
      'permissions.route': { eager: false },
      'permissions.actions': { eager: false },
    },
    sort: [
      {
        field: 'id',
        order: 'DESC',
      },
    ],
  },
})
@Controller('roles')
export class RoleController implements CrudController<Role> {
  constructor(public service: RoleService) { }

  @Delete('soft-deleted/:id')
  public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softDeleteOne(id);
  }

  @Put('soft-restore/:id')
  public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softRestoreOne(id);
  }
}
