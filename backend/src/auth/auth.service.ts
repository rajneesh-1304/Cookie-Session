import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const userRepo = this.dataSource.getRepository(User);
    console.log(email, password)
    const user = await userRepo.findOne({ where: { email } });


    if (!user || user.password !== password) {
      return null;
    }

    if (user.isBanned) {
      throw new ForbiddenException('User is banned');
    }

    return user;
  }

  signIn(user: User, res) {
  const payload = { sub: user.id, email: user.email };
  const token = this.jwtService.sign(payload);

  res.cookie('access_token', token, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000, 
    sameSite: 'lax',
    secure: false, 
  });

  return {
    message: 'Login successful',
    user: {
      id: user.id,
      email: user.email,
    },
  };
}

}
