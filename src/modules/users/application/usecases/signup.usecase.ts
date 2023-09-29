import { UserOutput } from './../dtos/user-output';
import { UserEntity } from './../../domain/entities';
import { UserRepository } from '../../domain/repositories';
import { BadRequestError } from '../../../../shared/domain/errors';
import { ICryptography } from './../../../../shared/aplication/providers';
import { DefaultUseCase } from './../../../../shared/aplication/usecases';

export namespace SignupUseCase {
  export type Input = {
    name: string;
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
      const { email, name, password } = input;

      if (!email || !name || !password) {
        throw new BadRequestError('Input data not provided');
      }

      await this.userRepository.emailExists(email);

      const hashPassword = await this.cryptography.hash(password, 10);

      const entity = new UserEntity(
        Object.assign(input, { password: hashPassword }),
      );
      await this.userRepository.insert(entity);

      return entity.toJSON();
    }
  }
}
