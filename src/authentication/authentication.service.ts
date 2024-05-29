import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

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
      const validPassword = await bcrypt.compare(pass, user.password);
      if (!validPassword) {
        message = 'Hibás bejelentkezési adatok';
        return {
          access_token: null,
          user_object: null,
          message: message,
        };
      }
      const payload = user ? { sub: user.id, username: user.username } : null;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return {
        access_token: await this.jwtService.signAsync(payload),
        user_object: result,
        message: message,
      };
    }
  }
}
