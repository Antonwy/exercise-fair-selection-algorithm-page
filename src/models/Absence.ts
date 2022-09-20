import { Moment } from 'moment';
import { v4 } from 'uuid';
import { User } from './User';

export class Absence {
  id: string;
  user: User;
  from: Moment;
  to: Moment;

  constructor(id: string, user: User, from: Moment, to: Moment) {
    this.id = id;
    this.user = user;
    this.from = from;
    this.to = to;
  }

  static createAbsence(user: User, from: Moment, to: Moment): Absence {
    return new Absence(v4(), user, from, to);
  }

  toString(): String {
    return `Absence(id: ${this.id}, user: ${this.user.name}, from: ${this.from}, to: ${this.to})`;
  }
}
