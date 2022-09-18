import { Moment } from 'moment';
import { v4 } from 'uuid';

export class User {
  id: string;
  name: string;
  lastTimeCleaned?: Moment;

  constructor(id: string, name: string, lastTimeCleaned?: Moment) {
    this.id = id;
    this.name = name;
    this.lastTimeCleaned = lastTimeCleaned;
  }

  static createUser(name: string, lastTimeCleaned?: Moment): User {
    return new User(v4(), name, lastTimeCleaned);
  }

  toString(): String {
    return `User(id: ${this.id}, name: ${this.name}, lastTimeCleaned: ${this.lastTimeCleaned})`;
  }
}
