import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, ImageBackground } from 'react-native';
import { useHistory, BackButton } from 'react-router-native';
import backgroundImg from '../../images/female-5x5.jpg';
import { ButtonIconText, themeColors, ConfirmFooter, add0, formatSeconds } from '../common';
import { shortBeep, longBeep } from '../../sounds/sounds';
import { componentStyle } from '../../styles';
import { Exercise5x5 } from './Exercise5x5';

export class Workout5x5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workout: {
        type: this.props.location.state.workouts.strongLifts.trainingType,
        exercise1: {
          set1: 0,
          set2: 0,
          set3: 0,
          set4: 0,
          set5: 0,
          done: ""
        },
        exercise2: {
          set1: 0,
          set2: 0,
          set3: 0,
          set4: 0,
          set5: 0,
          done: ""
        },
        exercise3: {
          set1: 0,
          set2: 0,
          set3: 0,
          set4: 0,
          set5: 0,
          done: ""
        },
      },
      // Timer state
      interval: null,
      miliseconds: 0,

    }
  };
  user = this.props.location.state
  ///////////////// Timer //////////////////////////////////////////

  tick = () => {
    this.setState({ miliseconds: this.state.miliseconds - 1000 })
    // End Timer
    if (this.state.miliseconds <= 0) {
      clearInterval(this.state.interval);
      // Play sound on 0
      longBeep.play();
    };
    // Play sound on 10,3,2,1
    if (this.state.miliseconds === 10000 || this.state.miliseconds === 3000 || this.state.miliseconds === 2000 || this.state.miliseconds === 1000) {
      beep.play();
    };
  };

  runTimer = async (exerciseNo, setNo) => {
    if (this.state.workout[exerciseNo][setNo] === 5) {
      clearInterval(this.state.interval);
      await this.setState({ miliseconds: 90000 })
      this.setState({ interval: setInterval(this.tick, 1000) });
    } else if (this.state.workout[exerciseNo][setNo] === 0) {
      clearInterval(this.state.interval);
      this.setState({ miliseconds: 0 });
    } else {
      clearInterval(this.state.interval);
      await this.setState({ miliseconds: 300000 })
      this.setState({ interval: setInterval(this.tick, 1000) });
    }
  };

  componentWillUnmount() {
    clearInterval(this.state.interval);
  };

  /////////////////////////////////////////////////////////////////////////////
  onRepCount = (exerciseNo, setNo) => {
    if (this.state.workout[exerciseNo][setNo] === 0) {
      this.setState({
        workout: {
          ...this.state.workout,
          [exerciseNo]: {
            ...this.state.workout[exerciseNo],
            [setNo]: 5
          }
        }
      }, () => {
        this.exerciseDone(exerciseNo, setNo);
      });
    } else {
      this.setState({
        workout: {
          ...this.state.workout,
          [exerciseNo]: {
            ...this.state.workout[exerciseNo],
            [setNo]: this.state.workout[exerciseNo][setNo] - 1
          }
        }
      }, () => {
        this.exerciseDone(exerciseNo, setNo);
      });
    };
  };

  exerciseDone = (exerciseNo, setNo) => {
    if (this.state.workout[exerciseNo].set1 === 5 &&
      this.state.workout[exerciseNo].set2 === 5 &&
      this.state.workout[exerciseNo].set3 === 5 &&
      this.state.workout[exerciseNo].set4 === 5 &&
      this.state.workout[exerciseNo].set5 === 5) {
      clearInterval(this.state.interval);
      this.setState({
        miliseconds: 0,
        workout: {
          ...this.state.workout,
          [exerciseNo]: {
            ...this.state.workout[exerciseNo],
            done: "5x5"
          }
        }
      });
    } else if (this.state.workout[exerciseNo].set1 > 0 &&
      this.state.workout[exerciseNo].set2 > 0 &&
      this.state.workout[exerciseNo].set3 > 0 &&
      this.state.workout[exerciseNo].set4 > 0 &&
      this.state.workout[exerciseNo].set5 > 0) {
      clearInterval(this.state.interval);
      this.setState({
        miliseconds: 0,
        workout: {
          ...this.state.workout,
          [exerciseNo]: {
            ...this.state.workout[exerciseNo],
            done: "almost"
          }
        }
      });
    } else {
      this.setState({
        workout: {
          ...this.state.workout,
          [exerciseNo]: {
            ...this.state.workout[exerciseNo],
            done: ""
          }
        }
      }, () => this.runTimer(exerciseNo, setNo));
    }
  };

  onWorkoutSave = () => {
    const dataA = {
      exercise1: this.state.workout.exercise1.done,
      exercise2: this.state.workout.exercise2.done,
      exercise3: this.state.workout.exercise3.done,
      Squat: this.user.workouts.strongLifts.Squat,
      "Bench Press": this.user.workouts.strongLifts["Bench Press"],
      "Barbell Row": this.user.workouts.strongLifts["Barbell Row"]
    };
    const dataB = {
      exercise1: this.state.workout.exercise1.done,
      exercise2: this.state.workout.exercise2.done,
      exercise3: this.state.workout.exercise3.done,
      Squat: this.user.workouts.strongLifts.Squat,
      "Overhead Press": this.user.workouts.strongLifts["Overhead Press"],
      Deadlift: this.user.workouts.strongLifts.Deadlift
    };

    if (this.state.workout.type === 'a') {
      this.props.startSetEditData5x5(this.user.id, {
        history: {
          ...this.user.workouts.history,
          [Date.now()]: dataA
        },
        strongLifts: {
          ...this.user.workouts.strongLifts,
          Squat: dataA.exercise1 === "5x5" ? this.user.workouts.strongLifts.Squat + 2.5 : this.user.workouts.strongLifts.Squat,
          "Bench Press": dataA.exercise2 === "5x5" ? this.user.workouts.strongLifts["Bench Press"] + 2.5 : this.user.workouts.strongLifts["Bench Press"],
          "Barbell Row": dataA.exercise3 === "5x5" ? this.user.workouts.strongLifts["Barbell Row"] + 2.5 : this.user.workouts.strongLifts["Barbell Row"],
          trainingType: "b"
        }
      });
    } else {
      this.props.startSetEditData5x5(this.user.id, {
        history: {
          ...this.user.workouts.history,
          [Date.now()]: dataB
        },
        strongLifts: {
          ...this.user.workouts.strongLifts,
          Squat: dataB.exercise1 === "5x5" ? this.user.workouts.strongLifts.Squat + 2.5 : this.user.workouts.strongLifts.Squat,
          "Overhead Press": dataB.exercise2 === "5x5" ? this.user.workouts.strongLifts["Overhead Press"] + 2.5 : this.user.workouts.strongLifts["Overhead Press"],
          Deadlift: dataB.exercise3 === "5x5" ? this.user.workouts.strongLifts.Deadlift + 5 : this.user.workouts.strongLifts.Deadlift,
          trainingType: "a"
        }
      });
    };
  };
  onDone = () => done5x5(this.state.workout, this.onWorkoutSave)
  render() {
    const exercises = [{
      exerciseName: "Squat",
      exerciseSets: this.state.workout.exercise1,
    }, {
      exerciseName: this.state.workout.type === 'a' ? "Bench Press" : "Overhead Press",
      exerciseSets: this.state.workout.exercise2,
    }, {
      exerciseName: this.state.workout.type === 'a' ? "Barbell Row" : "Deadlift",
      exerciseSets: this.state.workout.exercise3,
    }];
    return (
      <View style={styles.container}>
        <StatusBar hidden animated />
        <Text style={styles.timer}>Rest: {formatSeconds(Math.ceil(this.state.miliseconds / 1000))}</Text>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.workoutContainer}>
              <View style={styles.exerciseContainer}>
                {exercises.map((e, index) =>
                  <Exercise5x5
                    key={e.exerciseName}
                    exerciseName={e.exerciseName}
                    exerciseWeight={this.user.workouts.strongLifts[e.exerciseName]}
                    exerciseNo={`exercise${index + 1}`}
                    exerciseSets={e.exerciseSets}
                    onRepCount={this.onRepCount} />
                )}

              </View>
            </View>
          </ScrollView>
        <ConfirmFooter
          confirmText='Save Workout'
          confirmIcon='save'
          confirmIconType='fa5'
          onConfirm={() => { }}
          disableConfirm={!(this.state.workout.exercise1.done && this.state.workout.exercise2.done && this.state.workout.exercise3.done)}
          cancelText='Quit'
          cancelIcon='ban'
          cancelIconType='fa5'
        />
        <BackButton />
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  scrollContainer: {
    alignItems: 'center',
    width: '100%',
  },
  timer: {
    backgroundColor: themeColors.theme2,
    color: themeColors.offWhite,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    height: 80,
    width: '100%',
    textAlignVertical: 'center',
    elevation: 10,
  },
  exerciseContainer: {
    marginTop: 15,
    width: '100%',
  },
  workoutContainer: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    width: '100%',
  }
});