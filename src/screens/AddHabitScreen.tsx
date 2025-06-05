import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/habit";
import { loadHabits, saveHabits } from "../utils/storage";

type Props = NativeStackScreenProps<RootStackParamList, "AddHabit">;

export const AddHabitScreen: React.FC<Props> = ({ navigation }) => {
  const [habitName, setHabitName] = useState("");

  const handleSubmit = async () => {
    if (!habitName.trim()) {
      Alert.alert("Error", "Please enter a habit name");
      return;
    }

    try {
      const existingHabits = await loadHabits();
      const newHabit = {
        id: Date.now().toString(),
        name: habitName.trim(),
        createdAt: new Date().toISOString(),
        completedDates: [],
      };

      const updatedHabits = [...existingHabits, newHabit];
      await saveHabits(updatedHabits);

      // Clear the input and navigate back
      setHabitName("");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save habit");
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Habit</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={habitName}
          onChangeText={setHabitName}
          placeholder="Enter habit name"
          placeholderTextColor="#999"
          autoFocus
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.submitButton,
              !habitName.trim() && styles.buttonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!habitName.trim()}
          >
            <Text style={styles.submitButtonText}>Add Habit</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#007AFF",
  },
  cancelButton: {
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
});
