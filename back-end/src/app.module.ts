import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { configService } from './config/config.service';
import { ProfileModule } from './users/profile/profile.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './util/mail/mail.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
		UsersModule,
		AuthModule,
		AdminModule,
		ProfileModule,
		MailModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
