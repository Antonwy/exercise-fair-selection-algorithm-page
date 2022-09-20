import { Moment } from 'moment';
import { v4 } from 'uuid';

export class User {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static createUser(name: string): User {
    return new User(v4(), name);
  }

  toString(): String {
    return `User(id: ${this.id}, name: ${this.name})`;
  }
}
