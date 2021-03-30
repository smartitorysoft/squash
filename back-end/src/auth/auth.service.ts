import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { configService } from 'src/config/config.service';
import { TokenPayload } from './interfaces/tokenPayload.interface';
import { User } from 'src/entities';
import { AuthenticationFailedException } from 'src/util/exceptions/authentication.exception';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) {}

	public async getAuthenticatedUser(
		email: string,
		hashedPassword: string
	): Promise<User> {
		try {
			const user = await this.usersService.getByEmail(email);
			const isPasswordMatching = await bcrypt.compare(
				hashedPassword,
				user.password
			);
			if (!isPasswordMatching) {
				throw new AuthenticationFailedException('200au00');
			}

			return user;
		} catch (error) {
			throw new AuthenticationFailedException('200au00');
		}
	}

	public getCookieWithJwtToken(userId: string): string {
		const payload: TokenPayload = { userId };
		const token = this.jwtService.sign(payload);
		return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${
			configService.getJwtConfig().jwtExpirationTime
		}`;
	}

	public getCookieForLogOut(): string {
		return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
	}

	public async solicitPasswordReset(email: string): Promise<boolean> {
		return await this.usersService.resetPassword(email);
	}

	public async setPasswordToken(
		token: string,
		newPassword: string
	): Promise<boolean> {
		return await this.usersService.setPassWithToken(token, newPassword);
	}

	public async setPasswordUser(
		user: User,
		newPassword: string
	): Promise<boolean> {
		return await this.usersService.setPassWithUser(user, newPassword);
	}
}
