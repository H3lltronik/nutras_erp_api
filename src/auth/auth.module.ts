import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

const JWTModule = JwtModule.register({
  global: true,
  secret: 'secret',
  signOptions: { expiresIn: '60s' },
});

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, JWTModule],
})
export class AuthModule {}
