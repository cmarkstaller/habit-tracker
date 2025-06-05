import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { RootStackParamList, Habit } from "../types/habit";
import { HabitStatsCard } from "../components/HabitStats";
import { loadHabits } from "../utils/storage";
import { calculateHabitStats } from "../utils/stats";

type Props = NativeStackScreenProps<RootStackParamList, "Stats">;

export const StatsScreen: React.FC<Props> = () => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit Statistics</Text>
      <ScrollView style={styles.scrollView}>
        {habits.map((habit) => (
          <HabitStatsCard
            key={habit.id}
            name={habit.name}
            stats={calculateHabitStats(habit)}
          />
        ))}
        {habits.length === 0 && (
          <Text style={styles.emptyText}>
            No habits yet. Add some habits to see your statistics!
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 16,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    fontSize: 16,
    color: "#666",
  },
});
