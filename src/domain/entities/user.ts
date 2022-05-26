import { IsDefined, IsEmail, IsEmpty, IsString, MinLength } from 'class-validator';
import * as bcrypt from 'bcrypt';

const PASSWORD_SALT_ROUDS = 10;

export class User {
  id?: number;

  @IsDefined()
  @IsString()
  @IsEmpty()
  name: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @MinLength(8)
  password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = bcrypt.hashSync(password, PASSWORD_SALT_ROUDS);
  }

  validatePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}
