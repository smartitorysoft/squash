import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ name: 'profile' })
export class Profile {
	@Index()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', length: 128, nullable: true })
	firstName: string;

	@Column({ type: 'varchar', length: 128, nullable: true })
	lastName: string;

	@Column({ type: 'date', nullable: true })
	dateOfBirth: Date;
}
