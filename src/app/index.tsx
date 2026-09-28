import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    if (input.trim() === "") {
      return;
    }

    setTasks([...tasks, input]);
    setInput("");
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My To-Do List</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task..."
          value={input}
          onChangeText={setInput}
        />

        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addText}>ADD</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskRow}>
            <Text style={styles.taskText}>{item}</Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(index)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks yet. Add your first task!
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  addButton: {
    backgroundColor: "#222",
    marginLeft: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 10,
  },

  addText: {
    color: "white",
    fontWeight: "bold",
  },

  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },

  taskText: {
    flex: 1,
    fontSize: 17,
  },

  deleteButton: {
    backgroundColor: "#e53935",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  deleteText: {
    color: "white",
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 30,
  },
});

