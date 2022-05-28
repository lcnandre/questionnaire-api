import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'auth' })
export class AuthDto {
  @Field()
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
