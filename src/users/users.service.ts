import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserToken } from './interfaces/usertoken';
import { SearchParam } from './interfaces/utils';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserToken(): Promise<UserToken> {
    return new Promise<UserToken>((resolve) => resolve('Temporary Token'));
  }

  async findOne(value: string, param: SearchParam) {
    switch (param) {
      case SearchParam.EMAIL:
        return this.userModel.find({ email: value }).exec();
      case SearchParam.USER_ID:
        return this.userModel.find({ _id: value }).exec();
    }
    return null;
  }
}
