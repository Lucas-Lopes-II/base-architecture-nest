import { UserEntity } from './../../../domain/entities/user.entity';
import { ConflictError } from './../../../../../shared/domain/errors/conflict-error';
import { NotFoundError } from './../../../../../shared/domain/errors/not-found-error';
import { UserDataBuilder } from '../../../domain/entities/testing/helpers/user-data-builder';
import { UserInMemoryRepository } from './../../database/repositories/in-memory/user-in-memory.repository';

describe('UserInMemoryRepository unit tests', () => {
  let userInMemoryRepository: UserInMemoryRepository;

  beforeEach(() => {
    userInMemoryRepository = new UserInMemoryRepository();
  });

  describe('findByEmail method', () => {
    it('Should throw error when not found', async () => {
      await expect(
        userInMemoryRepository.findByEmail('a@a.com'),
      ).rejects.toThrow(
        new NotFoundError('Entity not found using email a@a.com'),
      );
    });

    it('Should find a entity by email', async () => {
      const entity = new UserEntity(UserDataBuilder({}));
      await userInMemoryRepository.insert(entity);
      const result = await userInMemoryRepository.findByEmail(entity.email);

      expect(entity.toJSON()).toStrictEqual(result.toJSON());
    });
  });

  describe('emailExists method', () => {
    it('Should throw error when not found', async () => {
      const entity = new UserEntity(UserDataBuilder({}));
      await userInMemoryRepository.insert(entity);

      await expect(
        userInMemoryRepository.emailExists(entity.email),
      ).rejects.toThrow(new ConflictError('Email address already used'));
    });

    it('Should find a entity by email', async () => {
      expect.assertions(0);
      await userInMemoryRepository.emailExists('a@a.com');
    });
  });

  // describe('applyFilter method', () => {});

  // describe('applySort method', () => {});
});
