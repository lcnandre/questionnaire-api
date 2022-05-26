import { validate } from 'class-validator';

import { User } from './user';

describe('User (entity)', () => {
  it ('Should have a valid name, email and password', async () => {
    const user = new User('', '', '');
    const errors = await validate(user);

    expect(errors).toHaveLength(2);
    expect(errors[0].property).toBe('name');
    expect(errors[1].property).toBe('email');
  });

  it ('Should store the password hash', () => {
    const user = new User('Test', 'test@test.com', '123');
    expect(user.password.substring(0, 7)).toBe('$2b$10$');
  });

  it ('Should validate the hashed password', () => {
    const user = new User('Test', 'test@test.com', '123');
    expect(user.validatePassword('123')).toBe(true);
  });
});
