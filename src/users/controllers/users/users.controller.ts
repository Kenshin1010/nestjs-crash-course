import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  // @Get()
  // getUsers() {
  //   return [{ username: 'anson', email: 'anson@anson.com' }];
  // }
  // @Get()
  // getUsers(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {
  //   return [{ username: 'anson', email: 'anson@anson.com' }];
  // }

  @Get()
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Get('posts')
  getUserPosts() {
    return [
      {
        username: 'anson',
        email: 'anson@anson.com',
        posts: [
          {
            id: 1,
            title: 'Post 1',
          },
          {
            id: 2,
            title: 'Post 2',
          },
        ],
      },
    ];
  }

  @Get('posts/comments')
  getUserPostsComments() {
    return [
      {
        id: 1,
        title: 'Post 1',
        comments: [],
      },
    ];
  }

  // express
  // import { Request, Response } from 'express';
  // @Post('create')
  // createUser(@Req() request: Request, @Res() response: Response) {
  //   console.log(request.body);
  //   response.send('Created');
  // }

  // @Post('create')
  // @UsePipes(new ValidationPipe())
  // createUser(@Body() userData: CreateUserDto) {
  //   console.log(userData);
  //   return {};
  // }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: CreateUserDto) {
    console.log(userData.age.toPrecision());
    return this.userService.createUser(userData);
  }

  // @Get(':id')
  // import { Request, Response } from 'express';
  // getUserById(@Req() request: Request, @Res() response: Response) {
  //   console.log(request.params);
  //   response.send('');
  // }

  // @Get(':id/:postId')
  // getUserById(@Param('id') id: string, @Param('postId') postId: string) {
  //   console.log(id);
  //   return { id, postId };
  // }

  // @Get(':id')
  // getUserById(@Param('id', ParseIntPipe) id: number) {
  //   console.log(id);
  //   return { id };
  // }

  // @Get(':id')
  // getUserById(@Param('id', ParseIntPipe) id: number) {
  //   return this.userService.fetchUserById(id);
  // }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.fetchUserById(id);
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return user;
  }
}
