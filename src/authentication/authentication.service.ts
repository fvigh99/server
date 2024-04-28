import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);
    let message: string;
    if (!user) {
      message = 'Hibás bejelentkezési adatok';
      return {
        access_token: null,
        user_object: null,
        message: message,
      };
    } else {
      await bcrypt.compare(pass, user.password, function (err, result) {
        if (err) {
          message = err;
        } else if (!result) {
          message = 'Hibás bejelentkezési adatok!';
          throw new UnauthorizedException();
        }
      });
      const payload = user ? { sub: user.id, username: user.username } : null;
      const { password, ...result } = user;
      return {
        access_token: await this.jwtService.signAsync(payload),
        user_object: result,
        message: message,
      };
    }
  }
}
