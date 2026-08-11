import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRoles } from '../../../common/enums/user.enum';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  countAll() {
    return this.usersRepository.count();
  }

  findById(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async makeRole(userId: string, role: string) {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const normalizedRole = role.trim().toUpperCase() as UserRoles;

    user.role = normalizedRole;
    return this.usersRepository.save(user);
  }
}
