import {
  ConflictError,
  BadRequestError,
} from './../../../../../../shared/domain/errors';
import { SignupUseCase } from '../../signup.usecase';
import {
  ICryptography,
  Bcrypt,
} from './../../../../../../shared/aplication/providers';
import { UserInMemoryRepository } from './../../../../infrastructure/database/repositories';
import { UserDataBuilder } from '../../../../domain/entities/testing/helpers/user-data-builder';

describe('SignupUseCase unit tests', () => {
  let signupUseCase: SignupUseCase.UseCase;
  let repository: UserInMemoryRepository;
  let hashProvider: ICryptography;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    hashProvider = new Bcrypt();
    signupUseCase = new SignupUseCase.UseCase(repository, hashProvider);
  });

  it('Should create a user', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    const props = UserDataBuilder({});
    const result = await signupUseCase.execute({
      name: props.name,
      email: props.email,
      password: props.password,
    });

    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(spyInsert).toHaveBeenCalledTimes(1);
  });

  it('Should not be able to register with same email twice', async () => {
    const props = UserDataBuilder({ email: 'a@a.com' });
    await signupUseCase.execute(props);

    await expect(() => signupUseCase.execute(props)).rejects.toBeInstanceOf(
      ConflictError,
    );
  });

  it('Should throws error when name not provided', async () => {
    const props = Object.assign(UserDataBuilder({}), { name: null });

    await expect(() => signupUseCase.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    );
  });

  it('Should throws error when email not provided', async () => {
    const props = Object.assign(UserDataBuilder({}), { email: null });

    await expect(() => signupUseCase.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    );
  });

  it('Should throws error when password not provided', async () => {
    const props = Object.assign(UserDataBuilder({}), { password: null });

    await expect(() => signupUseCase.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    );
  });
});
