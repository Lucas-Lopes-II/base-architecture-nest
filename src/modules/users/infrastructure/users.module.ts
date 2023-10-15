import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { SignupUseCase } from '../application/usecases';
import { UserInMemoryRepository } from './database/repositories';
import { ICryptography } from '../../../shared/aplication/providers';
import { SigninUseCase } from '../application/usecases/signin.usecase';
import { CryptoModule } from './../../../shared/infrastructure/crypto';
import { GetUserUseCase } from '../application/usecases/getuser.usecase';
import { USER_REPOSITORY, UserRepository } from '../domain/repositories';
import { ListUsersUseCase } from '../application/usecases/listusers.usecase';
import { UpdateUserUseCase } from '../application/usecases/update-user.usecase';
import { DeleteUserUseCase } from '../application/usecases/delete-user.usecase';
import { UpdatePasswordUseCase } from '../application/usecases/update-password.usecase';

@Module({
  controllers: [UsersController, CryptoModule],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserInMemoryRepository,
    },
    {
      provide: SigninUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: ICryptography,
      ) => {
        return new SigninUseCase.UseCase(userRepository, hashProvider);
      },
      inject: [USER_REPOSITORY, ICryptography],
    },
    {
      provide: SignupUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: ICryptography,
      ) => {
        return new SignupUseCase.UseCase(userRepository, hashProvider);
      },
      inject: [USER_REPOSITORY, ICryptography],
    },
    {
      provide: GetUserUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new GetUserUseCase.UseCase(userRepository);
      },
      inject: [USER_REPOSITORY],
    },

    {
      provide: ListUsersUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new ListUsersUseCase.UseCase(userRepository);
      },
      inject: [USER_REPOSITORY],
    },
    {
      provide: UpdateUserUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new UpdateUserUseCase.UseCase(userRepository);
      },
      inject: [USER_REPOSITORY],
    },
    {
      provide: UpdatePasswordUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: ICryptography,
      ) => {
        return new UpdatePasswordUseCase.UseCase(userRepository, hashProvider);
      },
      inject: [USER_REPOSITORY, ICryptography],
    },
    {
      provide: DeleteUserUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new DeleteUserUseCase.UseCase(userRepository);
      },
      inject: [USER_REPOSITORY],
    },
  ],
})
export class UsersModule {}
