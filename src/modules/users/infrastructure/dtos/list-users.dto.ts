import { ListUsersUseCase } from '../../application/usecases';
import { SortDirection } from '../../../../shared/domain/repositories/searchable-repository.interface';

export class ListUsersDto implements ListUsersUseCase.Input {
  page?: number;
  perPage?: number;
  sort?: string;
  sortDir?: SortDirection;
  filter?: string;
}
