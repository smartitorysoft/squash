import {
	BaseEntity,
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToOne
} from 'typeorm';
import { User } from '../user/user.entity';
import { Payment } from '../../../dist/entities';
import { Court } from '../../appointments/enum/court.enum';

@Entity({ name: 'appointments' })
@Index(['id', 'createdAt'])
export class Appointment extends BaseEntity {
	@Column('timestamptz', { nullable: false })
	begins: Date;

	@JoinColumn()
	@ManyToOne(() => User, { nullable: false, eager: false })
	user: User;

	@JoinColumn()
	@OneToOne(() => Payment, { nullable: false, eager: false })
	payment: Payment;

	@Column('enum', { nullable: false, name: 'court', enum: Court })
	court: Court;
}
