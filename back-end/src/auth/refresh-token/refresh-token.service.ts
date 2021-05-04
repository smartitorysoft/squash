import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { configService } from 'src/config/config.service';
import { RefreshToken, User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class RefreshTokenService {
	constructor(
		@InjectRepository(RefreshToken)
		private readonly repository: Repository<RefreshToken>,
	) {}

	public async create(user: User, token: string): Promise<string> {
		const newToken = this.repository.create({
			user,
			expires: new Date(
				Number(new Date().getTime()) +
					Number(configService.getJwtConfig().refreshMaxAge),
			),
			token,
		});

		const result = await this.repository.save(newToken);

		return result.token;
	}

	public async validate(
		token: string,
	): Promise<{ valid: boolean; user: User | null }> {
		const result = await this.repository.findOne({ token });

		return {
			valid:
				typeof result !== undefined &&
				typeof result !== null &&
				result.expires > new Date(),
			user: result.user,
		};
	}

	public async delete(user: User): Promise<void> {
		await this.repository.delete({ user });
	}
}
