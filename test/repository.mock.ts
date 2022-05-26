import { FilterQuery } from '@mikro-orm/core';

class MockRepository<T> {
  private data: T[] = [];

  async persistAndFlush(entity: T | T[]): Promise<void> {
    if (!Array.isArray(entity)) {
      entity = [entity];
    }

    for (const item of entity) {
      if (!item['id']) {
        item['id'] = this.autoIncrement();
        this.data.push(item);
      } else {
        const idx = this.data.findIndex((c) => {
          return c['id'] === item['id'];
        });
        this.data.splice(idx, 1, item);
      }
    }
  }

  async findOne(where: FilterQuery<T>): Promise<T | null> {
    let obj: T = this.filterData(where)[0];

    if (obj) {
      return obj;
    }

    return null;
  }

  private filterData(params: FilterQuery<T>): T[] {
    return this.data.filter(d => {
      return this.compareData(d, params);
    });
  }

  private compareData(data: T, params: FilterQuery<T>): boolean {
    for (const key of Object.keys(params)) {
      if (params[key]) {
        if (params[key].constructor.name === 'Object') {
          return this.compareData(data[key], params[key]);
        }
        return data[key] === params[key];
      }
    }
  }

  private autoIncrement() {
    return this.data.length
      ? (Math.max(...this.data.map((u) => u['id'])) || 0) +1
      : 1;
  }
}

export default function createMockRepository<T>() {
  return new MockRepository<T>();
}
