import { Entity } from '../../../entities/entity';
import { InMemoryRepository } from '../../in-memory.repository';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository unit tests', () => {
  let stubInMemoryRepository: StubInMemoryRepository;

  beforeEach(() => {
    stubInMemoryRepository = new StubInMemoryRepository();
  });

  it('Should inserts a new entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 });
    await stubInMemoryRepository.insert(entity);
    expect(entity.toJSON()).toStrictEqual(
      stubInMemoryRepository.items[0].toJSON(),
    );
  });
});
