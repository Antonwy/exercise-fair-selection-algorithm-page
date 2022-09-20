import { Absence } from '../models/Absence';
import { Cleaning } from '../models/Cleaning';
import { Room } from '../models/Room';
import { User } from '../models/User';
import { CleaningSettings } from '../stores/settingsStore';

export const calculateCleaningUser = (users: User[]): User | undefined => {
  // TODO: Implement user that needs to clean

  return undefined;
};

export const calculateCleaningUsers = (
  users: User[],
  rooms: Room[],
  cleanings: Cleaning[],
  absences: Absence[],
  settings: CleaningSettings
): User[] => {
  return [];
};
