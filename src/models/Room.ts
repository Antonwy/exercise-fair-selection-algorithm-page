import { v4 } from 'uuid';

export class Room {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static createRoom(name: string): Room {
    return new Room(v4(), name);
  }

  toString(): String {
    return `Room(id: ${this.id}, name: ${this.name})`;
  }
}
