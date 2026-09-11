import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AdminUsersService } from './admin-users.service';
import { User } from '../../users/entities/user.entity';
import { UserRoles } from '../../../common/enums/user.enum';

describe('AdminUsersService', () => {
  let service: AdminUsersService;
  let usersRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminUsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            count: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(AdminUsersService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  describe('makeRole', () => {
    it('throws NotFoundException when the user does not exist', async () => {
      usersRepository.findOne.mockResolvedValue(null);

      await expect(service.makeRole('missing-id', 'ADMIN')).rejects.toThrow(
        NotFoundException,
      );
      expect(usersRepository.save).not.toHaveBeenCalled();
    });

    it('throws BadRequestException for an invalid role', async () => {
      usersRepository.findOne.mockResolvedValue({ id: 'u1' } as User);

      await expect(service.makeRole('u1', 'not-a-role')).rejects.toThrow(
        BadRequestException,
      );
      expect(usersRepository.save).not.toHaveBeenCalled();
    });

    it('normalizes and saves a valid role', async () => {
      const user = { id: 'u1', role: UserRoles.USER } as User;
      usersRepository.findOne.mockResolvedValue(user);
      usersRepository.save.mockResolvedValue({
        ...user,
        role: UserRoles.ADMIN,
      });

      const result = await service.makeRole('u1', 'admin');

      expect(user.role).toBe(UserRoles.ADMIN);
      expect(usersRepository.save).toHaveBeenCalledWith(user);
      expect(result.role).toBe(UserRoles.ADMIN);
    });
  });
});
