import { SearchInput } from './../dtos';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from './../../../../shared/aplication/dtos';
import { UserOutput, UserOutputMapper } from './../dtos';
import { UserRepository } from '../../domain/repositories';
import { DefaultUseCase } from './../../../../shared/aplication/usecases';

export namespace ListUsersUseCase {
  export type Input = SearchInput;

  export type Output = PaginationOutput<UserOutput>;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new UserRepository.SearchParams(input);
      const searchResult = await this.userRepository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: UserRepository.SearchResult): Output {
      const items = searchResult.items.map((item) => {
        return UserOutputMapper.toOutput(item);
      });

      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }
}
