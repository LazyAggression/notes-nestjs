import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { SignInDto } from './dtos/signIn.dto';
import { SignUpDto } from './dtos/signUp.dto';
import { User } from './entities/users.entity';
import { JwtPayload } from './interfaces/jwtPayload.interface';
import { UserAuth } from './interfaces/userAuth.interface';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { name, email, password, username } = signUpDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User(username, hashedPassword, email, name);
    await this.usersRepository.persistAndFlush(newUser);
    const userAuth = this.getUserAuth(newUser);
    return userAuth;
  }

  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;
    const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const userAuth = this.getUserAuth(user);
      return userAuth;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Please check your login credentials',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private getUserAuth(user: User) {
    const payload: JwtPayload = {
      username: user.username,
      name: user.name,
      user_id: user.user_id,
    };
    const accessToken: string = this.jwtService.sign(payload);
    const userAuth: UserAuth = {
      accessToken,
      username: user.username,
      name: user.name,
      user_id: user.user_id,
    };
    return userAuth;
  }

  validateAuth(user: User) {
    const userAuth = this.getUserAuth(user);
    return userAuth;
  }
}
