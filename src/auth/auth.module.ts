import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

export const jwtSecret = '9XLpRGP9ohJVPA3Q+0cRQHIYh+Chi8IWnW36apNCSQs=';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '5m' },
    }),
  ],
})
export class AuthModule {}
