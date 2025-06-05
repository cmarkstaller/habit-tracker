import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "../types/habit";
import { HabitList } from "../components/HabitList";
import { Habit } from "../types/habit";
import { loadHabits, saveHabits } from "../utils/storage";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const HomeScreen: React.FC<Props> = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  const loadHabitsFromStorage = async () => {
    const loadedHabits = await loadHabits();
    setHabits(loadedHabits);
  };

  // Reload habits when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadHabitsFromStorage();
    }, [])
  );

  const handleToggleHabit = async (habitId: string) => {
    const today = new Date().toISOString().split("T")[0];
    const updatedHabits = habits.map((habit) => {
      if (habit.id === habitId) {
        const completedDates = habit.completedDates.includes(today)
          ? habit.completedDates.filter((date) => date !== today)
          : [...habit.completedDates, today];
        return { ...habit, completedDates };
      }
      return habit;
    });

    setHabits(updatedHabits);
    await saveHabits(updatedHabits);
  };

  const handleDeleteHabit = async (habitId: string) => {
    const updatedHabits = habits.filter((habit) => habit.id !== habitId);
    setHabits(updatedHabits);
    await saveHabits(updatedHabits);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Habits</Text>
      <HabitList
        habits={habits}
        onToggleHabit={handleToggleHabit}
        onDeleteHabit={handleDeleteHabit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
