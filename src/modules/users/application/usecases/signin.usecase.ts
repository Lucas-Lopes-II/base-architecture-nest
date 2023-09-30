import {
  BadRequestError,
  InvalidCredentialsError,
} from '../../../../shared/domain/errors';
import { UserOutput, UserOutputMapper } from '../dtos';
import { UserRepository } from '../../domain/repositories';
import { ICryptography } from '../../../../shared/aplication/providers';
import { DefaultUseCase } from '../../../../shared/aplication/usecases';

export namespace SigninUseCase {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly userRepository: UserRepository.Repository,
      private readonly cryptography: ICryptography,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { email, password } = input;

      if (!email || !password) {
        throw new BadRequestError('Input data not provided');
      }

      const entity = await this.userRepository.findByEmail(email);

      const passwordsMatches = await this.cryptography.compare(
        password,
        entity.password,
      );

      if (!passwordsMatches) {
        throw new InvalidCredentialsError('Invalid credentials');
      }

      return UserOutputMapper.toOutput(entity);
    }
  }
}
