import { UserEntity } from '../../../../domain/entities/user.entity';
import { UserRepository } from '../../../../domain/repositories/user.repository';
import { ConflictError } from '../../../../../../shared/domain/errors/conflict-error';
import { NotFoundError } from '../../../../../../shared/domain/errors/not-found-error';
import { InMemorySearchableRepository } from '../../../../../../shared/domain/repositories/in-memory-searchable.repository';

export class UserInMemoryRepository
  extends InMemorySearchableRepository<UserEntity>
  implements UserRepository
{
  public async findByEmail(email: string): Promise<UserEntity> {
    const entity = this.items.find((item) => item.email === email);
    if (!entity)
      throw new NotFoundError(`Entity not found using email ${email}`);

    return entity;
  }

  public async emailExists(email: string): Promise<void> {
    const entity = this.items.find((item) => item.email === email);
    if (entity) throw new ConflictError('Email address already used');
  }
}
