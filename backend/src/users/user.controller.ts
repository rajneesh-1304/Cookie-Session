import { Controller, Get, Post, Body, Delete, Patch, Param, Query, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersDefinition } from './DTO/user';
import { LoginUserDto } from './DTO/login';
import { AuthGuard } from '@nestjs/passport';  

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  
  @UseGuards(AuthGuard('local'))
  @Post('login')  
  login(@Request() req): any {  
    req.session.user = req.user;  
    return { message: 'Login successful' };  
  }  

  @Post('logout')  
  logout(@Request() req): any {  
    req.session.destroy();  
    return { message: 'Logout successful' };  
  }  

  @Post('register')
  registerUser(@Body() userData: UsersDefinition) {
    return this.userService.register(userData);
  }

  @Patch('delete/:id')
  deleteQuestion(
    @Param('id') id: any,
  ) {
    return this.userService.banUser(+id);
  }

  @Get()
  getAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.userService.getAll({page, limit});
}

}
