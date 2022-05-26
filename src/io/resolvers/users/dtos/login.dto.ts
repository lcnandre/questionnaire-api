import { ArgsType, Field } from '@nestjs/graphql';
import { IsDefined, IsEmail } from 'class-validator';

@ArgsType()
export class LoginDto {
  @Field()
  @IsDefined()
  @IsEmail()
  email: string;

  @Field()
  @IsDefined()
  password: string;
}
