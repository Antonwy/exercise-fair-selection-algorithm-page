import moment from 'moment';
import { Moment } from 'moment';
import { v4 } from 'uuid';
import { Room } from './Room';
import { User } from './User';

export class Cleaning {
  id: string;
  room: Room;
  user: User;
  date: Moment;

  constructor(id: string, room: Room, user: User, date?: Moment) {
    this.id = id;
    this.room = room;
    this.user = user;
    this.date = date ?? moment();
  }

  static createCleaning(room: Room, user: User, date?: Moment): Cleaning {
    return new Cleaning(v4(), room, user, date);
  }

  toString(): String {
    return `Cleaning(id: ${this.id}, room: ${this.room.name}, user: ${this.user.name})`;
  }
}
