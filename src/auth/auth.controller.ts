import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { GetUser } from './decorators/getUser.decorator';
import { SignInDto } from './dtos/signIn.dto';
import { SignUpDto } from './dtos/signUp.dto';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const userCreated = await this.authService.signUp(signUpDto);
    return userCreated;
  }

  @Post('/signin')
  async signIn(@Body() signInDto: SignInDto) {
    const userAuth = await this.authService.signIn(signInDto);
    return userAuth;
  }

  @UseGuards(AuthGuard())
  @Get('/validate')
  async validateAuth(@GetUser() user: User) {
    const userAuth = await this.authService.validateAuth(user);
    return userAuth;
  }
}
