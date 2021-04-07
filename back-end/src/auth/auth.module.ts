import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './guards/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/config/config.service';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
	imports: [
		UsersModule,
		JwtModule.registerAsync({
			useFactory: async () => ({
				secret: configService.getJwtConfig().jwtSecret,
				signOptions: {
					expiresIn: `${configService.getJwtConfig().jwtExpirationTime}s`
				}
			})
		})
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
