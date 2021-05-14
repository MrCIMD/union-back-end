import { Injectable } from '@nestjs/common';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';
import { existsSync } from 'fs';

@Injectable()
export class ConfigService {
  private readonly _envConfig: { [key: string]: string };

  constructor() {
    const envFilePath = __dirname + `/../../../${process.env.NODE_ENV}.env`;
    const existsPath = existsSync(envFilePath);
    if (!existsPath) {
      throw new Error(`${envFilePath} file does not exist`);
    } else {
      this._envConfig = parse(readFileSync(envFilePath));
    }
  }

  public get(key: string): string {
    return this._envConfig[key];
  }
}
