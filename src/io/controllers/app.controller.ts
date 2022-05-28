import { Controller, Get, HttpStatus, Redirect } from '@nestjs/common';

import { Public } from '../../application/decorators/public.decorator';

@Controller()
export class AppController {

  @Get()
  @Public()
  @Redirect('/graphql', HttpStatus.FOUND)
  root(): void {
    return;
  }
}
