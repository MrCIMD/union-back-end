import { Controller, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { RouteService } from './route.service';
import { Route } from '../../entities';

@Crud({
  model: {
    type: Route,
  },
  query: {
    filter: {
      deletedAt: {
        $eq: null
      }
    },
    join: {
      icon: { eager: false },
      parent: { eager: false },
      children: { eager: false },
      permissions: { eager: false },
      'permissions.role': { eager: false },
      'permissions.actions': { eager: false },
      actions: { eager: false },
    },
    sort: [
      {
        field: 'id',
        order: 'DESC',
      },
    ],
  },
})
@Controller('routes')
export class RouteController implements CrudController<Route> {
  constructor(public service: RouteService) { }

  @Delete('soft-deleted/:id')
  public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softDeleteOne(id);
  }

  @Put('soft-restore/:id')
  public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softRestoreOne(id);
  }
}
