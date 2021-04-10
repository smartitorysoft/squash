import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToOne
} from 'typeorm';
import { User } from '../user/user.entity';
import { Court } from '../../appointments/enum/court.enum';
import { Payment } from '../payment/payment.entity';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'appointments' })
@Index(['id', 'createdAt'])
export class Appointment extends BaseEntity {
	@Column('timestamptz', { nullable: false })
	begins: Date;

	@JoinColumn()
	@ManyToOne(() => User, { nullable: false, eager: true })
	user: User;

	@JoinColumn()
	@OneToOne(() => Payment, { nullable: false, eager: false })
	payment: Payment;

	@Column('enum', { nullable: false, name: 'court', enum: Court })
	court: Court;
}
