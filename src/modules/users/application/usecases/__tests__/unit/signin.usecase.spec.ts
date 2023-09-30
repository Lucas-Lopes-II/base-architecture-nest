import {
  BadRequestError,
  InvalidCredentialsError,
  NotFoundError,
} from './../../../../../../shared/domain/errors';
import { SigninUseCase } from '../../signin.usecase';
import { UserEntity } from './../../../../domain/entities';
import {
  Bcrypt,
  ICryptography,
} from './../../../../../../shared/aplication/providers';
import { UserInMemoryRepository } from './../../../../infrastructure/database/repositories';
import { UserDataBuilder } from '../../../../domain/entities/testing/helpers/user-data-builder';

describe('SigninUseCase unit tests', () => {
  let signinUseCase: SigninUseCase.UseCase;
  let repository: UserInMemoryRepository;
  let hashProvider: ICryptography;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    hashProvider = new Bcrypt();
    signinUseCase = new SigninUseCase.UseCase(repository, hashProvider);
  });

  it('Should authenticate a user', async () => {
    const spyFindByEmail = jest.spyOn(repository, 'findByEmail');
    const hashPassword = await hashProvider.hash('1234');
    const entity = new UserEntity(
      UserDataBuilder({ email: 'a@a.com', password: hashPassword }),
    );
    repository.items = [entity];

    const result = await signinUseCase.execute({
      email: entity.email,
      password: '1234',
    });

    expect(spyFindByEmail).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(entity.toJSON());
  });

  it('Should throws error when email not provided', async () => {
    await expect(() =>
      signinUseCase.execute({ email: null, password: '1234' }),
    ).rejects.toBeInstanceOf(BadRequestError);
  });

  it('Should throws error when password not provided', async () => {
    await expect(() =>
      signinUseCase.execute({ email: 'a@a.com', password: null }),
    ).rejects.toBeInstanceOf(BadRequestError);
  });

  it('Should not be able authenticate with wrong email', async () => {
    await expect(() =>
      signinUseCase.execute({ email: 'a@a.com', password: '1234' }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('Should not be able authenticate with wrong password', async () => {
    const hashPassword = await hashProvider.hash('1234');
    const entity = new UserEntity(
      UserDataBuilder({ email: 'a@a.com', password: hashPassword }),
    );
    repository.items = [entity];

    await expect(() =>
      signinUseCase.execute({ email: 'a@a.com', password: 'fake' }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
