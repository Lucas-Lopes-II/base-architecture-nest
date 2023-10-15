import { ListUsersUseCase } from '../../application/usecases';
import { SortDirection } from '../../../../shared/domain/repositories/searchable-repository.interface';
import { IsOptional, IsString } from 'class-validator';

export class ListUsersDto implements ListUsersUseCase.Input {
  @IsOptional()
  page?: number;

  @IsOptional()
  perPage?: number;

  @IsString({ message: 'sort must be string' })
  @IsOptional()
  sort?: string;

  @IsString({ message: 'sortDir must be string' })
  @IsOptional()
  sortDir?: SortDirection;

  @IsString({ message: 'filter must be string' })
  @IsOptional()
  filter?: string;
}
