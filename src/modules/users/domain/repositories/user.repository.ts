import { UserEntity } from '../entities';
import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  ISearchableRepository,
} from './../../../../shared/domain/repositories';

export namespace UserRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<UserEntity, Filter> {}

  export interface Repository
    extends ISearchableRepository<
      UserEntity,
      Filter,
      SearchParams,
      SearchResult
    > {
    findByEmail(email: string): Promise<UserEntity>;
    emailExists(email: string): Promise<void>;
  }
}
