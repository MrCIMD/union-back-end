import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { ProfileService } from './profile.service';
import { Profile } from '../../entities';

@Crud({
  model: {
    type: Profile,
  },
  query: {
    filter: {
      deletedAt: {
        $eq: null
      }
    },
    join: {
      user: { eager: false },
    },
    sort: [
      {
        field: 'id',
        order: 'DESC',
      },
    ],
  },
})
@Controller('profiles')
export class ProfileController implements CrudController<Profile> {
  constructor(public service: ProfileService) { }

  @Delete('soft-deleted/:id')
  public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softDeleteOne(id);
  }

  @Put('soft-restore/:id')
  public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softRestoreOne(id);
  }
}
