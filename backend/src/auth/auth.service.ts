import { ForbiddenException,Req, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";

@Injectable()
export class AuthService {
    constructor(private readonly dataSource: DataSource) { }
    async login(email, password) {
        const userRepo = this.dataSource.getRepository(User);

        const user = await userRepo.findOne({
            where: { email },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if(user.password !== password){
            throw new ForbiddenException('PassWord is incorrect');
        }

        if (user) {
            return {
                message: 'User logged in successfully',
                user: {
                    id: user.id,
                    email: user.email,
                },
            };
        }
        return null;
    }

    async signIn(@Req() req: Request): Promise<User> {
    return req['user'] as User;
  }
}