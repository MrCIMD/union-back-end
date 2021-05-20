import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { IconService } from './icon.service';
import { Icon } from '../../entities';

@Crud({
  model: {
    type: Icon,
  },
  query: {
    filter: {
      deletedAt: {
        $eq: null
      }
    },
    join: {
      actions: { eager: true },
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
@Controller('icons')
export class IconController implements CrudController<Icon> {
  constructor(public service: IconService) { }

  @Delete('soft-deleted/:id')
  public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softDeleteOne(id);
  }

  @Put('soft-restore/:id')
  public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softRestoreOne(id);
  }
}
