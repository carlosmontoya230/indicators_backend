import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthSsoModule } from './auth-sso/auth-sso.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
config();
@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URI), AuthSsoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
