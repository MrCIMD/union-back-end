import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { ActionService } from './action.service';
import { Action } from '../../entities'

@Crud({
  model: {
    type: Action,
  },
  query: {
    filter: {
      deletedAt: {
        $eq: null
      }
    },
    join: {
      icon: { eager: true },
      permission: { eager: true },
      routes: { eager: true },
    },
    sort: [
      {
        field: 'id',
        order: 'DESC',
      },
    ],
  },
})
@Controller('actions')
export class ActionController implements CrudController<Action> {
  constructor(public service: ActionService) { }

  @Delete('soft-deleted/:id')
  public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softDeleteOne(id);
  }

  @Put('soft-restore/:id')
  public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softRestoreOne(id);
  }
}
