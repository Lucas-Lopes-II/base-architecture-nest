import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { SignupUseCase } from '../application/usecases';
import { UserInMemoryRepository } from './database/repositories';
import { ICryptography } from '../../../shared/aplication/providers';
import { CryptoModule } from './../../../shared/infrastructure/crypto';
import { USER_REPOSITORY, UserRepository } from '../domain/repositories';

@Module({
  controllers: [UsersController, CryptoModule],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserInMemoryRepository,
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
  ],
})
export class UsersModule {}
