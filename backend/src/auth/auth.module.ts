import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local.guard';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, LocalAuthGuard, SessionSerializer],
})
export class AuthModule {}
