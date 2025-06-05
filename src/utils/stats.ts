import { Habit } from "../types/habit";

export interface HabitStats {
  completionRate: number;
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
}

export const calculateHabitStats = (habit: Habit): HabitStats => {
  const today = new Date().toISOString().split("T")[0];
  const completedDates = habit.completedDates.sort();

  // Calculate completion rate (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentCompletions = completedDates.filter(
    (date) => date >= thirtyDaysAgo.toISOString().split("T")[0]
  );
  const completionRate = (recentCompletions.length / 30) * 100;

  // Calculate streaks
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Sort dates and check for consecutive days
  const sortedDates = [...completedDates].sort();
  for (let i = 0; i < sortedDates.length; i++) {
    const currentDate = new Date(sortedDates[i]);
    const nextDate =
      i < sortedDates.length - 1 ? new Date(sortedDates[i + 1]) : null;

    if (nextDate) {
      const dayDiff =
        (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);
      if (dayDiff === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }
  }

  // Calculate current streak
  if (completedDates.includes(today)) {
    let streakDate = new Date(today);
    while (completedDates.includes(streakDate.toISOString().split("T")[0])) {
      currentStreak++;
      streakDate.setDate(streakDate.getDate() - 1);
    }
  }

  return {
    completionRate,
    currentStreak,
    longestStreak,
    totalCompletions: completedDates.length,
  };
};
