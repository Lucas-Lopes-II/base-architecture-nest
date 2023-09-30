import { UserRepository } from '../../domain/repositories';
import { DefaultUseCase } from './../../../../shared/aplication/usecases/default-use-case';
import { UserOutput, UserOutputMapper } from '../dtos/user-output';
import { InvalidPasswordError } from './../../../../shared/domain/errors/invalid-password-error';
import { ICryptography } from './../../../../shared/aplication/providers/crypto/interfaces/cryptography.interface';

export namespace UpdatePasswordUseCase {
  export type Input = {
    id: string;
    password: string;
    oldPassword: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private cryptography: ICryptography,
    ) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id);
      if (!input.password || !input.oldPassword) {
        throw new InvalidPasswordError(
          'Old password and new password is required',
        );
      }

      const checkOldPassword = await this.cryptography.compare(
        input.oldPassword,
        entity.password,
      );
      if (!checkOldPassword) {
        throw new InvalidPasswordError('Old password does not match');
      }

      const hashPassword = await this.cryptography.hash(input.password);
      entity.updatePassword(hashPassword);
      await this.userRepository.update(entity);

      return UserOutputMapper.toOutput(entity);
    }
  }
}
