import { UserRepository } from '../../domain/repositories';
import { UserOutput, UserOutputMapper } from '../dtos/user-output';
import { BadRequestError } from './../../../../shared/domain/errors/bad-request-error';
import { DefaultUseCase } from './../../../../shared/aplication/usecases/default-use-case';

export namespace UpdateUserUseCase {
  export type Input = {
    id: string;
    name?: string;
    email?: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.name && !input.email) {
        throw new BadRequestError('Data not provided');
      }

      const entity = await this.userRepository.findById(input.id);

      entity.update({ ...input });
      await this.userRepository.update(entity);

      return UserOutputMapper.toOutput(entity);
    }
  }
}
