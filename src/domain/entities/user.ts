import { IsDefined, IsEmail, IsEmpty, IsString, MinLength } from 'class-validator';

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
}
