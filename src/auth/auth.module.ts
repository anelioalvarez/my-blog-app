import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';

export const jwtSecret = '9XLpRGP9ohJVPA3Q+0cRQHIYh+Chi8IWnW36apNCSQs=';

@Module({
  controllers: [AuthController],
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '5m' },
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
