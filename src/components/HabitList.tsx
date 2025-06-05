import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Habit } from "../types/habit";

interface HabitListProps {
  habits: Habit[];
  onToggleHabit: (habitId: string) => void;
  onDeleteHabit: (habitId: string) => void;
}

export const HabitList: React.FC<HabitListProps> = ({
  habits,
  onToggleHabit,
  onDeleteHabit,
}) => {
  const today = new Date().toISOString().split("T")[0];

  const renderHabit = ({ item }: { item: Habit }) => {
    const isCompletedToday = item.completedDates.includes(today);

    return (
      <View style={styles.habitItem}>
        <View style={styles.habitInfo}>
          <Text style={styles.habitName}>{item.name}</Text>
          <Text style={styles.habitDate}>
            Created: {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.habitActions}>
          <Switch
            value={isCompletedToday}
            onValueChange={() => onToggleHabit(item.id)}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isCompletedToday ? "#007AFF" : "#f4f3f4"}
          />
          <TouchableOpacity
            onPress={() => onDeleteHabit(item.id)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={habits}
      renderItem={renderHabit}
      keyExtractor={(item) => item.id}
      style={styles.list}
      ListEmptyComponent={
        <Text style={styles.emptyText}>
          No habits yet. Add your first habit!
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  habitItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
    justifyContent: "space-between",
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 18,
    fontWeight: "500",
  },
  habitDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  habitActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    marginLeft: 16,
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 24,
    color: "#ff3b30",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    fontSize: 16,
    color: "#666",
  },
});
