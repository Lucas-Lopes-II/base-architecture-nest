import { Entity } from '../../../entities/entity';
import { InMemorySearchableRepository } from '../../in-memory-searchable.repository';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ['name'];

  protected async applyFilter(
    items: StubEntity[],
    filter: string | null,
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items;
    }

    return items.filter((item) => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
}

describe('InMemoryRepository unit tests', () => {
  let StubInMemorySearchableRepo: StubInMemorySearchableRepository;

  beforeEach(() => {
    StubInMemorySearchableRepo = new StubInMemorySearchableRepository();
  });

  describe('applyFilter method', () => {
    it('should not filter items when filter param is null', async () => {
      const items = [new StubEntity({ name: 'name value', price: 50 })];
      const spyFilterMethod = jest.spyOn(items, 'filter');
      const itemsFiltered = await StubInMemorySearchableRepo['applyFilter'](
        items,
        null,
      );
      expect(itemsFiltered).toStrictEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();
    });

    it('should filter using a filter param', async () => {
      const items = [
        new StubEntity({ name: 'test', price: 50 }),
        new StubEntity({ name: 'TEST', price: 50 }),
        new StubEntity({ name: 'fake', price: 50 }),
      ];
      const spyFilterMethod = jest.spyOn(items, 'filter');
      let itemsFiltered = await StubInMemorySearchableRepo['applyFilter'](
        items,
        'TEST',
      );
      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(1);

      itemsFiltered = await StubInMemorySearchableRepo['applyFilter'](
        items,
        'test',
      );
      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);

      itemsFiltered = await StubInMemorySearchableRepo['applyFilter'](
        items,
        'no-filter',
      );
      expect(itemsFiltered).toHaveLength(0);
      expect(spyFilterMethod).toHaveBeenCalledTimes(3);
    });
  });

  describe('applySort method', () => {
    it('should no sort items', async () => {
      const items = [
        new StubEntity({ name: 'b', price: 50 }),
        new StubEntity({ name: 'a', price: 50 }),
      ];

      let itemsSorted = await StubInMemorySearchableRepo['applySort'](
        items,
        null,
        null,
      );
      expect(itemsSorted).toStrictEqual(items);

      itemsSorted = await StubInMemorySearchableRepo['applySort'](
        items,
        'price',
        'asc',
      );
      expect(itemsSorted).toStrictEqual(items);
    });

    it('should sort items', async () => {
      const items = [
        new StubEntity({ name: 'b', price: 50 }),
        new StubEntity({ name: 'a', price: 50 }),
        new StubEntity({ name: 'c', price: 50 }),
      ];

      let itemsSorted = await StubInMemorySearchableRepo['applySort'](
        items,
        'name',
        'asc',
      );
      expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]]);

      itemsSorted = await StubInMemorySearchableRepo['applySort'](
        items,
        'name',
        'desc',
      );
      expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]]);
    });
  });

  describe('applyPaginate method', () => {
    it('should paginate items', async () => {
      const items = [
        new StubEntity({ name: 'a', price: 50 }),
        new StubEntity({ name: 'b', price: 50 }),
        new StubEntity({ name: 'c', price: 50 }),
        new StubEntity({ name: 'd', price: 50 }),
        new StubEntity({ name: 'e', price: 50 }),
      ];

      let itemsPaginated = await StubInMemorySearchableRepo['applyPaginate'](
        items,
        1,
        2,
      );
      expect(itemsPaginated).toStrictEqual([items[0], items[1]]);

      itemsPaginated = await StubInMemorySearchableRepo['applyPaginate'](
        items,
        2,
        2,
      );
      expect(itemsPaginated).toStrictEqual([items[2], items[3]]);

      itemsPaginated = await StubInMemorySearchableRepo['applyPaginate'](
        items,
        3,
        2,
      );
      expect(itemsPaginated).toStrictEqual([items[4]]);

      itemsPaginated = await StubInMemorySearchableRepo['applyPaginate'](
        items,
        4,
        2,
      );
      expect(itemsPaginated).toStrictEqual([]);
    });
  });

  // describe('search method', () => {});
});
