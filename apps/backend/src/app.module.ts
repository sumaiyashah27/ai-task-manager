import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';  //  AuthModule import

@Module({
  imports: [
    // ConfigModule env vars ko global banata hai
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    AuthModule, // JWT AuthModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
