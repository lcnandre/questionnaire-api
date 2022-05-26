import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

import { User } from '../../domain/entities/user';

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const admin = new User('Andre', 'lcn.andre@gmail.com', 'admin123');
    await em.persistAndFlush(admin);
  }
}
