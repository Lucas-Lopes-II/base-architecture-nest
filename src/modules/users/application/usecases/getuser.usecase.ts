import { UserOutput } from './../dtos';
import { UserRepository } from '../../domain/repositories';
import { DefaultUseCase } from './../../../../shared/aplication/usecases';

export namespace GetUserUseCase {
  export type Input = {
    id: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id);

      return entity.toJSON();
    }
  }
}
