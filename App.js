import { useState } from "react";
import { Button, FlatList, StyleSheet, TextInput, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  function addGoalHandler(enteredGoalText) {
    if (enteredGoalText === "") return;
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, key: Math.random() * new Date() },
    ]);

    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    console.log("BROSI", id);
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.key !== id);
    });
  }

  function startAddGoalHandler() {
    setModalVisible(true);
  }

  function endAddGoalHandler() {
    setModalVisible(false);
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Modal"
          color="#5e0acc"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalVisible}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsCotainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.key}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  goalsCotainer: {
    flex: 5,
    marginTop: 30,
  },
});
