import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../user/user.entity';
import { PaymentType } from '../../payments/enum/payment-type.enum';

@Entity({ name: 'payments' })
@Index(['id', 'createdAt'])
export class Payment extends BaseEntity {
	@Column({ type: 'int', nullable: false })
	value: number;

	@ManyToOne((type) => User, { nullable: false, eager: true })
	@JoinColumn()
	user: User;

	@Column('enum', { name: 'category', enum: PaymentType })
	type: PaymentType;
}
