import {
  BadRequestException,
  ConflictException,
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
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly storageService: StorageService,
    private readonly config: ConfigService,
    private readonly mailService: MailService,
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

  private async findByIdOrFail(id: string): Promise<User> {
    const user = await this.findById(id);
    if (!user)
      throw new NotFoundException({
        code: ErrorCodes.USER_NOT_FOUND,
      });
    return user;
  }

  async currentUser(id: string) {
    const user = await this.findByIdOrFail(id);
    return this.safeUserResponse(user);
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.usersRepository.update(id, {
      lastLoginAt: new Date(),
    });
  }

  async update(updateUserDto: UpdateUserDto, userId: string) {
    const user = await this.findByIdOrFail(userId);
    let message = 'Profile updated successfully';

    if (
      updateUserDto.email &&
      updateUserDto.email.toLowerCase().trim() !== user.email
    ) {
      const emailLowercase = updateUserDto.email.toLowerCase().trim();
      const emailExists = await this.findByEmail(emailLowercase);
      if (emailExists && emailExists.id !== user.id) {
        throw new ConflictException({
          code: ErrorCodes.EMAIL_ALREADY_EXISTS,
        });
      }
      updateUserDto.email = emailLowercase;
      user.isEmailVerified = false;
      user.verificationToken = randomBytes(32).toString('hex');
      user.verificationTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

      const link = this.generateVerificationLink(
        user.id,
        user.verificationToken,
      );
      await this.mailService.sendVerifyEmailTemplate(emailLowercase, link);

      message = 'A verification link has been sent to your new email address.';
    }

    if (
      updateUserDto.username &&
      updateUserDto.username.trim() !== user.username
    ) {
      const usernameTrimmed = updateUserDto.username.trim();
      const usernameExists = await this.findByUsername(usernameTrimmed);
      if (usernameExists && usernameExists.id !== user.id) {
        throw new ConflictException({
          code: ErrorCodes.USERNAME_ALREADY_IN_USE,
        });
      }
      updateUserDto.username = usernameTrimmed;
    }

    if (updateUserDto.bio !== undefined) {
      if (!user.profile) {
        user.profile = new UserProfile();
      }
      user.profile.bio = updateUserDto.bio;
    }

    Object.assign(user, {
      username: updateUserDto.username,
      email: updateUserDto.email,
    });
    const updatedUser = await this.usersRepository.save(user);

    return { user: this.safeUserResponse(updatedUser), message };
  }

  async delete(userId: string): Promise<void> {
    const user = await this.findByIdOrFail(userId);
    await this.usersRepository.softRemove(user);
  }

  async setProfileAvatar(userId: string, file: Express.Multer.File) {
    const user = await this.findByIdOrFail(userId);
    const key = await this.storageService.uploadFile(file, 'avatars');
    const newProfileAvatar = key.split('/')[1];

    if (!user.profile) {
      user.profile = new UserProfile();
    }

    if (user.profile.avatar) {
      await this.storageService.deleteFile(`avatars/${user.profile.avatar}`);
    }

    user.profile.avatar = newProfileAvatar;
    const savedUser = await this.usersRepository.save(user);
    return this.safeUserResponse(savedUser);
  }

  async removeProfileAvatar(userId: string) {
    const user = await this.findByIdOrFail(userId);
    if (!user.profile || !user.profile.avatar) {
      throw new BadRequestException({
        code: ErrorCodes.NO_PROFILE_AVATAR,
      });
    }

    await this.storageService.deleteFile(`avatars/${user.profile.avatar}`);

    user.profile.avatar = null;
    const savedUser = await this.usersRepository.save(user);
    return this.safeUserResponse(savedUser);
  }

  private generateVerificationLink(
    userId: string,
    verificationToken: string,
  ): string {
    const clientUrl = this.config.getOrThrow<string>('CLIENT_URL');
    return `${clientUrl}/api/v1/auth/verify-email/${userId}/${verificationToken}`;
  }

  private safeUserResponse(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      lastLoginAt: user.lastLoginAt,
      profile: user.profile
        ? {
            avatar: user.profile.avatar,
            bio: user.profile.bio,
          }
        : null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
