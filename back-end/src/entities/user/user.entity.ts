/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Entity,
	Column,
	ManyToOne,
	OneToOne,
	JoinColumn,
	Index
} from 'typeorm';
import { BaseEntity, Role } from 'src/entities';
import { Profile } from './profile.entity';

@Entity({ name: 'users' })
@Index(['id', 'createdAt'])
export class User extends BaseEntity {
	@Column({ type: 'varchar', length: 128, unique: true })
	email: string;

	@Column({ type: 'varchar', length: 256 })
	password: string;

	@ManyToOne((type) => Role, (role) => role.name, { eager: true })
	role: Role;

	@Column({ type: 'varchar', length: 128, nullable: true })
	resetToken: string;

	@Column({ type: 'varchar', length: 128, nullable: true })
	social: string;

	@OneToOne((type) => Profile, { nullable: false, eager: true })
	@JoinColumn()
	profile: Profile;
}
