import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [UserModule,MongooseModule.forRoot('mongodb+srv://maftuna:maftuna@auth-nestjs.bvzd2.mongodb.net/')],
  controllers: [],
})
export class AppModule {}
