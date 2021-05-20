import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { IJwt, IToken } from './interface';
import { User } from '../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) public repo: Repository<User>, private readonly jwt: JwtService) {
    super(repo);
  }

  public async signup(user: User) {
    const { email } = user;
    const userExists = await this.repo.findOne({
      where: [{ email }],
      relations: ['profile', 'role'],
    });
    if (userExists) {
      throw new UnauthorizedException('¡El usuario ya existe!');
    }
    const auth = await this.create(user);
    return await this.generateToken(auth);
  }

  public async signin(authDto: User): Promise<IToken> {
    const { email, password } = authDto;
    const user = await this.repo.findOne({
      where: [{ email }],
      relations: ['profile', 'role'],
    });
    if (!user) {
      throw new UnauthorizedException('¡El usuario no existe!');
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('¡Credenciales no válidas!');
    }

    return await this.generateToken(user);
  }

  public async changePassword(user: User): Promise<User> {
    const { password } = user;
    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    await this.repo.update(user.id, user);
    delete user.password;
    return user;
  }

  public async renewToken(email: string): Promise<IToken> {
    const user: User = await this.repo.findOne({ email }, { relations: ['profile', 'role'] });
    if (user) {
      return this.generateToken(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  public async validateToken(token: string): Promise<User> {
    const decode: any = this.jwt.decode(token);
    return await this.repo.findOne({ email: decode.email }, { relations: ['profile', 'role'] });
  }

  private async generateToken(user: User): Promise<IToken> {
    const payload: IJwt = {
      id: user.id,
      email: user.email,
    };
    const token = this.jwt.sign(payload);
    await this.repo.update(user.id, { rememberToken: token });
    const decode: any = this.jwt.decode(token);
    delete user.password;
    delete user.rememberToken;
    return {
      user, token,
      exp: new Date(decode.exp * 1000),
      iat: new Date(decode.iat * 1000),
    };
  }

  public async create(newuser: User): Promise<User> {
    const { password } = newuser;
    const salt = await genSalt(10);
    newuser.password = await hash(password, salt);
    return await this.repo.save(newuser);
  }

  public async softDeleteOne(id: number) {
    const object = await this.findOne(id);
    if (!object) {
      throw new NotFoundException('This entity does not exists');
    }
    return await this.repo.softDelete(id);
  }

  public async softRestoreOne(id: number) {
    const object = await this.repo.findOne({ id }, { withDeleted: true });
    if (!object) {
      throw new NotFoundException('This entity does not exists');
    }
    return await this.repo.restore(id);
  }
}
