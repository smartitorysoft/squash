import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entities';
import { PermissionService } from 'src/admin/permission/permission.service';
import { configService } from 'src/config/config.service';

@Injectable()
export class RolesService {
	constructor(
		@InjectRepository(Role)
		private readonly roleRepository: Repository<Role>,
		private permService: PermissionService,
	) {}

	async onApplicationBootstrap(): Promise<void> {
		await this.bootstrap();
	}

	private async bootstrap(): Promise<void> {
		const rootRole = await this.getRole('root');
		if (rootRole === undefined) {
			await this.createRole('root', 'Smartitory use only!');
			console.log(`Generated root role!`);
		} else {
			console.log(`Skipping root role generation...`);
			console.log(`Checking target list...`);
			const missingPermissions = await this.validateRolePermissions();

			if (missingPermissions.length > 0) {
				console.log(`Found ${missingPermissions.length} missing permissions`);
				await this.createRolePermissions(missingPermissions);
			} else {
				console.log(`Found no missing permissions!`);
			}
		}

		return;
	}

	private async validateRolePermissions(): Promise<
		{ role: Role; target: string }[]
	> {
		const roles = await this.getRoles();

		const result = [];

		for (const role of roles) {
			const nonExistentPermissions = await this.permService.checkAgainstTargetList(
				role,
			);

			if (nonExistentPermissions.length > 0) {
				nonExistentPermissions.forEach((nep) =>
					result.push({ role: role, target: nep }),
				);
			}
		}
		return result;
	}

	private async createRolePermissions(
		toCreate: { role: Role; target: string }[],
	): Promise<void> {
		for (const item of toCreate) {
			await this.permService.create(item.role, item.target);
			console.log(
				`Created permmission for role ${item.role.name} on target ${item.target}`,
			);
		}
	}

	public async createRole(
		name: string,
		description: string | null,
	): Promise<string> {
		const newRole = await this.roleRepository.create({
			name: name,
			description: description,
		});

		await this.roleRepository.save(newRole);

		const targetList = configService.getTargetList();

		targetList.forEach(async (target) => {
			await this.permService.create(newRole, target);
		});

		return newRole.id;
	}

	public async getRoles(): Promise<Role[]> {
		return await this.roleRepository.find();
	}

	public async getById(id: string): Promise<Role> {
		return await this.roleRepository.findOneOrFail({ id });
	}

	public async getRole(name: string): Promise<Role> {
		return await this.roleRepository.findOne({ name: name });
	}
}
