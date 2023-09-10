import { Entity } from '../entities/entity';
import { InMemoryRepository } from './in-memory.repository';
import { ISearchableRepository } from './searchable-repository.interface';

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements ISearchableRepository<E, any, any>
{
  search(props: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
