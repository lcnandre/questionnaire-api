import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Public } from '../../../application/decorators/public.decorator';
import { UserService } from '../../../domain/services/user.service';
import { AuthDto } from './dtos/auth.dto';
import { LoginDto } from './dtos/login.dto';

@Resolver(AuthDto)
export class UserResolver {
  constructor (private readonly service: UserService) { }

  @Public()
  @Mutation(/* istanbul ignore next */_ => AuthDto)
  async login(@Args('loginDto') dto: LoginDto): Promise<AuthDto> {
    const result = await this.service.validateUser(dto.email, dto.password);
    if (!result) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return new AuthDto(result);
  }
}
