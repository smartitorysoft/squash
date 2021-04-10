import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../entities';
import { PaymentsModule } from '../payments/payments.module';
import { AdminModule } from '../admin/admin.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Appointment]),
		PaymentsModule,
		AdminModule
	],
	controllers: [AppointmentsController],
	providers: [AppointmentsService],
	exports: [AppointmentsService]
})
export class AppointmentsModule {}
