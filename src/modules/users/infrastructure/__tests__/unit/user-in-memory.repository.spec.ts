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

  describe('applyFilter method', () => {
    it('Should no filter items when filter object is null', async () => {
      const entity = new UserEntity(UserDataBuilder({}));
      await userInMemoryRepository.insert(entity);
      const result = await userInMemoryRepository.findAll();
      const spyFilter = jest.spyOn(result, 'filter');
      const itemsFiltered = await userInMemoryRepository['applyFilter'](
        result,
        null,
      );

      expect(spyFilter).not.toHaveBeenCalled();
      expect(itemsFiltered).toStrictEqual(result);
    });

    it('Should filter name field using filter param', async () => {
      const items = [
        new UserEntity(UserDataBuilder({ name: 'Test' })),
        new UserEntity(UserDataBuilder({ name: 'TEST' })),
        new UserEntity(UserDataBuilder({ name: 'fake' })),
      ];
      const spyFilter = jest.spyOn(items, 'filter');
      const itemsFiltered = await userInMemoryRepository['applyFilter'](
        items,
        'TEST',
      );

      expect(spyFilter).toHaveBeenCalled();
      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
    });
  });

  describe('applySort method', () => {
    it('Should sort by createAt when sort param is null', async () => {
      const createdAt = new Date();
      const items = [
        new UserEntity(UserDataBuilder({ name: 'Test', createdAt })),
        new UserEntity(
          UserDataBuilder({
            name: 'TEST',
            createdAt: new Date(createdAt.getTime() + 1),
          }),
        ),
        new UserEntity(
          UserDataBuilder({
            name: 'fake',
            createdAt: new Date(createdAt.getTime() + 2),
          }),
        ),
      ];
      const itemsSorted = await userInMemoryRepository['applySort'](
        items,
        null,
        null,
      );

      expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
    });

    it('Should sort by name field', async () => {
      const items = [
        new UserEntity(UserDataBuilder({ name: 'c' })),
        new UserEntity(
          UserDataBuilder({
            name: 'd',
          }),
        ),
        new UserEntity(
          UserDataBuilder({
            name: 'a',
          }),
        ),
      ];
      let itemsSorted = await userInMemoryRepository['applySort'](
        items,
        'name',
        'asc',
      );
      expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]]);

      itemsSorted = await userInMemoryRepository['applySort'](
        items,
        'name',
        null,
      );
      expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]]);
    });
  });
});
