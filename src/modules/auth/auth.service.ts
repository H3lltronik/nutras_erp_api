import { comparePassword } from '@/src/common/utils/password';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const payload = await this.validateUser(username, pass);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await comparePassword(pass, user?.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { id: user.id, username: user.username };
    return payload;
  }
}
