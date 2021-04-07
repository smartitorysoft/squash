import {
	Controller,
	Get,
	Post,
	Body,
	UseGuards,
	Req,
	Param,
	Put,
	ParseUUIDPipe,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	Query
} from '@nestjs/common';
import { UsersService } from './users.service';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import CreateUserResponseDto from './dto/create-user.response.dto';
import JwtAuthenticationGuard from 'src/auth/guards/jwt-authentication.guard';
import RequestWithUser from 'src/auth/interfaces/requestWithUser.interface';
import { PermissionGuard } from 'src/admin/permission/guard/permission.guard';
import { Target } from 'src/admin/permission/decorators/target.decorator';
import { Operation } from 'src/admin/permission/decorators/permission.decorator';
import { ApiResponse } from '@nestjs/swagger';
import UserDataDto from './dto/user-data.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { configService } from 'src/config/config.service';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get()
	@UseGuards(JwtAuthenticationGuard, PermissionGuard)
	@Target('users')
	@Operation('read')
	async index(
		@Query('page') page = 1,
		@Query('limit') limit = 10
	): Promise<Pagination<UserDataDto>> {
		limit = limit > 20 ? 20 : limit;
		return this.usersService.paginate({
			page,
			limit,
			route: configService.getApiUrl() + 'users'
		});
	}

	@Get('me')
	@UseGuards(JwtAuthenticationGuard)
	@ApiResponse({ status: 200, type: UserDataDto })
	public async getMe(@Req() req: RequestWithUser): Promise<UserDataDto> {
		return new UserDataDto(req.user);
	}

	@Get(':id')
	@Target('users')
	@Operation('read')
	@ApiResponse({ status: 200, type: UserDataDto })
	public async getById(
		@Param('id', new ParseUUIDPipe()) id: string
	): Promise<UserDataDto> {
		return new UserDataDto(await this.usersService.getById(id));
	}

	@Post()
	@ApiResponse({ status: 200, type: CreateUserResponseDto })
	public async create(
		@Req() request: RequestWithUser,
		@Body() msg: CreateUserDto
	): Promise<CreateUserResponseDto> {
		const response = new CreateUserResponseDto();
		response.id = await this.usersService.create(msg);
		return response;
	}

	@Put(':id')
	@UseGuards(JwtAuthenticationGuard, PermissionGuard)
	@Target('users')
	@Operation('update')
	@ApiResponse({ status: 200, type: CreateUserResponseDto })
	public async update(
		@Req() request: RequestWithUser,
		@Body() msg: UpdateUserDto,
		@Param('id') id: string
	): Promise<CreateUserResponseDto> {
		const response = new CreateUserResponseDto();
		await this.usersService.update(id, msg, request.user);
		response.id = id;
		return response;
	}
}
