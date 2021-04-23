import {
	Controller,
	Post,
	Body,
	HttpCode,
	UseGuards,
	Req,
	Res,
	Put,
	HttpException,
	HttpStatus
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthenticationGuard } from './guards/local.guard';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { Response } from 'express';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';
import LoginDto from './dto/login.dto';
import ResetPasswordDto from './dto/reset-password.dto';
import { ModificationResponseDto } from 'src/dto/modification.response.dto';
import { ApiResponse } from '@nestjs/swagger';
import SetPasswordTokenDto from './dto/set-password-token.dto';
import SetPasswordUserDto from './dto/set-password-user.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(200)
	@UseGuards(LocalAuthenticationGuard)
	@Post()
	async logIn(
		@Req() request: RequestWithUser,
		@Body() dto: LoginDto,
		@Res() response: Response
	): Promise<Response> {
		const { user } = request;
		const cookie = this.authService.getCookieWithJwtToken(user.id);
		response.setHeader('Set-Cookie', cookie);
		response.json({
			success: true
		});
		return response.send();
	}

	@UseGuards(JwtAuthenticationGuard)
	@Post('logout')
	async logOut(
		@Req() request: RequestWithUser,
		@Res() response: Response
	): Promise<Response> {
		response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
		return response.sendStatus(200);
	}

	@Post('reset-password')
	@ApiResponse({ status: 200, type: ModificationResponseDto })
	async solicitPasswordReset(
		@Body() dto: ResetPasswordDto
	): Promise<ModificationResponseDto> {
		const result = await this.authService.solicitPasswordReset(dto.email);
		return new ModificationResponseDto(result);
	}

	@Post('password')
	@ApiResponse({ status: 200, type: ModificationResponseDto })
	async setPasswordWithToken(
		@Body() dto: SetPasswordTokenDto
	): Promise<ModificationResponseDto> {
		if (dto.password !== dto.confirmPassword) {
			throw new HttpException(
				'Passwords do not match!',
				HttpStatus.NOT_ACCEPTABLE
			);
		} else {
			const result = await this.authService.setPasswordToken(
				dto.token,
				dto.password
			);
			return new ModificationResponseDto(result);
		}
	}

	@UseGuards(JwtAuthenticationGuard)
	@Put('password')
	@ApiResponse({ status: 200, type: ModificationResponseDto })
	async setPasswordWithUser(
		@Req() request: RequestWithUser,
		@Body() dto: SetPasswordUserDto
	): Promise<ModificationResponseDto> {
		if (dto.password !== dto.confirmPassword) {
			throw new HttpException(
				'Passwords do not match!',
				HttpStatus.NOT_ACCEPTABLE
			);
		} else {
			const result = await this.authService.setPasswordUser(
				request.user,
				dto.password
			);
			return new ModificationResponseDto(result);
		}
	}
}
