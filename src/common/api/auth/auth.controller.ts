import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";

import { AuthService } from "./auth.service";
import { IToken } from "./interface";
import { User } from "../../entities";

@Crud({
  model: {
    type: User
  },
  query: {
    exclude: ["password", "rememberToken"],
    filter: {
      deletedAt: {
        $eq: null
      }
    },
    join: {
      profile: { eager: false },
      role: { eager: false },
      "role.permissions": { eager: false },
      "role.permissions.route": { eager: false },
      "role.permissions.actions": { eager: false }
    },
    sort: [
      {
        field: "id",
        order: "DESC"
      }
    ]
  }
})
@Controller("auth")
export class AuthController implements CrudController<User> {
  constructor(public service: AuthService) {
  }

  @Post("register")
  @UsePipes(ValidationPipe)
  public async signup(@Body() user: User): Promise<IToken> {
    return this.service.signup(user);
  }

  @Post("login")
  @UsePipes(ValidationPipe)
  public async signin(@Body() authDto: User): Promise<IToken> {
    return this.service.signin(authDto);
  }

  @Post("renew-token")
  public async renewToken(@Body() d: { email: string }): Promise<IToken> {
    return this.service.renewToken(d.email);
  }

  @Delete("soft-deleted/:id")
  public async softDeleteOne(@Param("id", ParseIntPipe) id: number) {
    return await this.service.softDeleteOne(id);
  }

  @Put("soft-restore/:id")
  public async softRestoreOne(@Param("id", ParseIntPipe) id: number) {
    return await this.service.softRestoreOne(id);
  }
}
