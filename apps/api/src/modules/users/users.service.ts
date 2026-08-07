import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user-profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ErrorCodes } from '../../common/errors/error-codes';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly storageService: StorageService,
  ) {}

  findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      relations: { profile: true },
    });
  }

  findByUsername(username: string) {
    return this.usersRepository.findOne({
      where: { username },
      relations: { profile: true },
    });
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create({
      ...createUserDto,
      profile: new UserProfile(),
    });
    return this.usersRepository.save(newUser);
  }

  save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async currentUser(id: string) {
    const user = await this.findById(id);
    if (!user)
      throw new NotFoundException({
        code: ErrorCodes.USER_NOT_FOUND,
      });
    return user;
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.usersRepository.update(id, {
      lastLoginAt: new Date(),
    });
  }

  async setProfileAvatar(userId: string, file: Express.Multer.File) {
    const user = await this.currentUser(userId);
    const key = await this.storageService.uploadFile(file, 'avatars');
    const newProfileAvatar = key.split('/')[1];

    if (!user.profile) {
      user.profile = new UserProfile();
    }

    if (user.profile.avatar) {
      await this.storageService.deleteFile(`avatars/${user.profile.avatar}`);
    }

    user.profile.avatar = newProfileAvatar;
    return await this.usersRepository.save(user);
  }

  async removeProfileAvatar(userId: string) {
    const user = await this.currentUser(userId);
    if (!user.profile || !user.profile.avatar) {
      throw new BadRequestException({
        code: ErrorCodes.NO_PROFILE_AVATAR,
      });
    }

    await this.storageService.deleteFile(`avatars/${user.profile.avatar}`);

    user.profile.avatar = null;
    return await this.usersRepository.save(user);
  }
}
