import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserToken } from './interfaces/usertoken';
import { User } from './schemas/user.schema';
import { SearchParam } from './interfaces/utils';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserToken> {
    const createdUser = await this.userService.create(createUserDto);
    if (createdUser) return this.userService.getUserToken();
    else return null;
  }

  @Get('/all')
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async getByID(@Param('id') id: string) {
    return this.userService.findOne(id, SearchParam.USER_ID);
  }

  @Get()
  async SearchOne(@Query() query) {
    console.log(query);
    if (query['email'])
      return this.userService.findOne(query['email'], SearchParam.EMAIL);
    else if (query['id'])
      return this.userService.findOne(query['id'], SearchParam.USER_ID);
    else
      throw new HttpException(
        'Invalid Query Parameter',
        HttpStatus.BAD_REQUEST,
      );
  }
}
