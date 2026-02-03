import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';  

import { LocalAuthGuard } from './local.guard';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')  
export class AuthController {  
    constructor(private authService: AuthService) {}
//   @UseGuards(LocalAuthGuard)  
  @Post('login')  
  @Public()
  @UseGuards(LocalAuthGuard)
  login(@Req() req: Request): any {  
    return this.authService.signIn(req); 
  }  

  @Get()
  getall(){
    return 'hello';
  }
//   @Post('logout')  
//   logout(@Request() req): any {  
//     req.session.destroy();  
//     return { message: 'Logout successful' };  
//   }  
}