export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  completedDates: string[]; // Array of ISO date strings
}

export type RootStackParamList = {
  Home: undefined;
  AddHabit: undefined;
  Stats: undefined;
};
