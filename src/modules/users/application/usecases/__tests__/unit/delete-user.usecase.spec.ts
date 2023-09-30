import { UserEntity } from './../../../../domain/entities';
import { DeleteUserUseCase } from '../../delete-user.usecase';
import { NotFoundError } from './../../../../../../shared/domain/errors';
import { UserInMemoryRepository } from './../../../../infrastructure/database/repositories';
import { UserDataBuilder } from '../../../../domain/entities/testing/helpers/user-data-builder';

describe('DeleteUserUseCase unit tests', () => {
  let deleteUserUseCase: DeleteUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    deleteUserUseCase = new DeleteUserUseCase.UseCase(repository);
  });

  it('Should throws error when entity not found', async () => {
    await expect(() =>
      deleteUserUseCase.execute({ id: 'fakeId' }),
    ).rejects.toThrow(new NotFoundError('Entity not found'));
  });

  it('Should delete a user', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');
    const items = [new UserEntity(UserDataBuilder({}))];
    repository.items = items;

    expect(repository.items).toHaveLength(1);
    await deleteUserUseCase.execute({ id: items[0]._id });
    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(repository.items).toHaveLength(0);
  });
});
