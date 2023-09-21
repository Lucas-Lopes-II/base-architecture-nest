import { Entity } from '../../../entities';
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

  it('Should throw error on update when entity not found', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 });

    await expect(stubInMemoryRepository.update(entity)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should update an entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 });
    await stubInMemoryRepository.insert(entity);
    const entityUpdated = new StubEntity(
      { name: 'updated', price: 10 },
      entity._id,
    );
    await stubInMemoryRepository.update(entityUpdated);

    expect(entityUpdated.toJSON()).toStrictEqual(
      stubInMemoryRepository.items[0].toJSON(),
    );
  });

  it('Should throw error when entity not found', async () => {
    await expect(stubInMemoryRepository.delete('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should delete an entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 });
    await stubInMemoryRepository.insert(entity);
    await stubInMemoryRepository.delete(entity._id);
    expect(stubInMemoryRepository.items).toHaveLength(0);
  });
});
