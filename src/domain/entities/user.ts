import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { IsDefined, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import * as bcrypt from 'bcrypt';

const PASSWORD_SALT_ROUDS = 10;

@Entity()
export class User {
  @PrimaryKey({ autoincrement: true })
  id?: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Property()
  name: string;

  @IsDefined()
  @IsEmail()
  @Property()
  email: string;

  @IsDefined()
  @MinLength(8)
  @Property()
  password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = bcrypt.hashSync(password, PASSWORD_SALT_ROUDS);
  }

  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
