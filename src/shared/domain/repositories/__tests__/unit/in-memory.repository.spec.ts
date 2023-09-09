import { Entity } from '../../../entities/entity';
import { InMemoryRepository } from '../../in-memory.repository';
import { NotFoundError } from './../../../errors/not-found-error';

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

  it('Should throw error when entity not found', async () => {
    await expect(stubInMemoryRepository.findById('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should find a entity by id', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 });
    await stubInMemoryRepository.insert(entity);
    const result = await stubInMemoryRepository.findById(entity._id);

    expect(entity.toJSON()).toStrictEqual(result.toJSON());
  });

  it('Should returns all entities', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 });
    await stubInMemoryRepository.insert(entity);
    const result = await stubInMemoryRepository.findAll();
    expect([entity]).toStrictEqual(result);
  });
});
