import { User } from '../../../entities';

export interface IToken {
  token: string;
  user: User;
  exp: Date | number;
  iat: Date | number;
}
