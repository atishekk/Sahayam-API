import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

const URI = 'mongodb://localhost:27017/sahayam';

@Module({
  imports: [MongooseModule.forRoot(URI), UsersModule],
})
export class AppModule {}
