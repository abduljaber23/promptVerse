import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { User } from '../../users/entities/user.entity';
import { UserRoles } from '../../../common/enums/user.enum';

describe('AdminUsersService', () => {
  let service: AdminUsersService;
  // Références directes aux mocks (plutôt que `repository.findOne`) pour éviter
  // @typescript-eslint/unbound-method : passer une méthode d'un objet typé
  // `Repository<User>` à `expect()` sans l'appeler est vu comme une référence
  // non liée, même si `usersRepository.findOne` est en réalité un jest.fn().
  const findOne = jest.fn();
  const save = jest.fn();

  beforeEach(async () => {
    findOne.mockReset();
    save.mockReset();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminUsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            count: jest.fn(),
            findOne,
            save,
          },
        },
      ],
    }).compile();

    service = module.get(AdminUsersService);
  });

  describe('makeRole', () => {
    it('throws NotFoundException when the user does not exist', async () => {
      findOne.mockResolvedValue(null);

      await expect(service.makeRole('missing-id', 'ADMIN')).rejects.toThrow(
        NotFoundException,
      );
      expect(save).not.toHaveBeenCalled();
    });

    it('throws BadRequestException for an invalid role', async () => {
      findOne.mockResolvedValue({ id: 'u1' });

      await expect(service.makeRole('u1', 'not-a-role')).rejects.toThrow(
        BadRequestException,
      );
      expect(save).not.toHaveBeenCalled();
    });

    it('normalizes and saves a valid role', async () => {
      const user = { id: 'u1', role: UserRoles.USER } as User;
      findOne.mockResolvedValue(user);
      save.mockResolvedValue({ ...user, role: UserRoles.ADMIN });

      const result = await service.makeRole('u1', 'admin');

      expect(user.role).toBe(UserRoles.ADMIN);
      expect(save).toHaveBeenCalledWith(user);
      expect(result.role).toBe(UserRoles.ADMIN);
    });
  });
});
