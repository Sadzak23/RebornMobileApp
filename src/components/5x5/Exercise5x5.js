import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ButtonText, themeColors } from '../common';

export const Exercise5x5 = ({ exerciseName, exerciseWeight, exerciseNo, exerciseSets, onRepCount }) => {
  const sets = [1, 2, 3, 4, 5]
  // useEffect(() => {
  //   const element = document.getElementById(exerciseName)
  //   if (exerciseSets.done === "5x5") {
  //     element.classList.remove('almost');
  //     element.classList.add('done');
  //   } else if (exerciseSets.done === "almost") {
  //     element.classList.remove('done');
  //     element.classList.add('almost');
  //   } else {
  //     element.classList.remove('done');
  //     element.classList.remove('almost');
  //   }
  // });

  const bottomMessage = () => {
    switch (exerciseSets.done) {
      case "":
        return "Click a button to enter rep number"
      case "5x5":
        return `Great job! Next time lift ${(exerciseWeight + 2.5)}kg`;
      case "almost":
        return "It's ok! You'll get it next time.";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.data}>
        <Text style={styles.text}>{exerciseName}</Text>
        <Text style={styles.text}>5x5 {exerciseWeight}kg</Text>
      </View>
      <View style={styles.btnContainer}>
        {sets.map((set) => (
          <ButtonText
            onPress={() => onRepCount(exerciseNo, `set${set}`)}
            text={exerciseSets[`set${set}`]}
            style={styles.btn}
            key={exerciseName + set}
            textStyle={{ fontSize: 25 }}
            blankStyle
          />
        ))}
      </View>
      <Text style={styles.message}>{bottomMessage()}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    marginVertical: 5,
    backgroundColor: themeColors.transparentBody,
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    color: themeColors.offWhite,
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  btn: {
    backgroundColor: themeColors.theme2,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 10
  },
  message: {
    textAlign: 'center',
    fontSize: 12
  }
})