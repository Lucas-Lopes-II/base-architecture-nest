import { UserEntity } from './../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { DefaoultUseCase } from './../../../../shared/aplication/usecases/use-case';
import { BadRequestError } from '../../../../shared/domain/errors/bad-request-error';
import { ICryptography } from './../../../../shared/aplication/crypto/interfaces/cryptography.interface';

export namespace SignupUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
  };

  export class UseCase implements DefaoultUseCase<Input, Output> {
    constructor(
      private readonly userRepository: UserRepository.Repository,
      private readonly cryptography: ICryptography,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { email, name, password } = input;

      if (!email || !name || !password) {
        throw new BadRequestError('Input data not provided');
      }

      await this.userRepository.emailExists(email);

      const entity = new UserEntity(input);

      await this.userRepository.insert(entity);

      return entity.toJSON();
    }
  }
}
