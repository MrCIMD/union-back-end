import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { PermissionService } from './permission.service';
import { Permission } from '../../entities';

@Crud({
  model: {
    type: Permission,
  },
  query: {
    filter: {
      deletedAt: {
        $eq: null
      }
    },
    join: {
      role: { eager: false },
      route: { eager: false },
      actions: { eager: false }
    },
    sort: [
      {
        field: 'id',
        order: 'DESC',
      },
    ],
  },
})
@Controller('permissions')
export class PermissionController implements CrudController<Permission> {
  constructor(public service: PermissionService) { }

  @Delete('soft-deleted/:id')
  public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softDeleteOne(id);
  }

  @Put('soft-restore/:id')
  public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softRestoreOne(id);
  }
}
