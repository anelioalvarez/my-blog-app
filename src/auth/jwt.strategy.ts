import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './types/jwt-payload.type';
import { jwtSecret } from './auth.module';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findOne(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
