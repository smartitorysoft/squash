import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../entities/payment/payment.entity';
import { AdminModule } from '../admin/admin.module';

@Module({
	imports: [TypeOrmModule.forFeature([Payment]), AdminModule],
	providers: [PaymentsService],
	controllers: [PaymentsController],
	exports: [PaymentsService]
})
export class PaymentsModule {}
