import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './users/profile/profile.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './util/mail/mail.module';
import { PaymentsModule } from './payments/payments.module';
import { configService } from './config/config.service';

@Module({
	imports: [
		TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
		UsersModule,
		AuthModule,
		AdminModule,
		ProfileModule,
		MailModule,
		PaymentsModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
