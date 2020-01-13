import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { BackButton } from 'react-router-native';
import database from '@react-native-firebase/database';
import { addWorkout5x5 } from '../../redux/actions/user';
import { themeColors, ConfirmFooter, Timer, ButtonText } from '../common';
import { ModalConfirm } from '../common/Modals';
import { Exercise5x5 } from './Exercise5x5';
import { connect } from 'react-redux';

export class Workout5x5 extends React.Component {
  constructor(props) {
    super(props);
    this.timer = React.createRef()
    this.user = this.props.location.state
    this.state = {
      showSaveModal: false,
      showQuitModal: false,
      isLoading: false,
      workout: {
        type: this.props.location.state.workouts.strongLifts.trainingType,
        exercise1: { set1: 0, set2: 0, set3: 0, set4: 0, set5: 0, done: '' },
        exercise2: { set1: 0, set2: 0, set3: 0, set4: 0, set5: 0, done: '' },
        exercise3: { set1: 0, set2: 0, set3: 0, set4: 0, set5: 0, done: '' },
      },
    }
  };
  // Timer Commands //
  startTimer = () => this.timer.current.onRunTimer();
  stopTimer = () => this.timer.current.onStopTimer()
  setSeconds = (sec) => this.timer.current.setSeconds(sec)

  runTimer = async (exerciseNo, setNo) => {
    if (this.state.workout[exerciseNo][setNo] === 5) {
      this.stopTimer()
      await this.setSeconds(90)
      this.startTimer()
    } else if (this.state.workout[exerciseNo][setNo] === 0) {
      this.stopTimer();
      this.setSeconds(0);
    } else {
      this.stopTimer()
      await this.setSeconds(300)
      this.startTimer()
    }
  };

  onRepCount = async (exerciseNo, setNo) => {
    if (this.state.workout[exerciseNo][setNo] === 0) {
      await this.setState({
        workout: {
          ...this.state.workout,
          [exerciseNo]: { ...this.state.workout[exerciseNo], [setNo]: 5 }
        }
      });
      this.exerciseDone(exerciseNo, setNo);
    } else {
      await this.setState({
        workout: {
          ...this.state.workout,
          [exerciseNo]: { ...this.state.workout[exerciseNo], [setNo]: this.state.workout[exerciseNo][setNo] - 1 }
        }
      });
      this.exerciseDone(exerciseNo, setNo);
    };
  };
  exerciseDone = (exerciseNo, setNo) => {
    if (this.state.workout[exerciseNo].set1 === 5 &&
      this.state.workout[exerciseNo].set2 === 5 &&
      this.state.workout[exerciseNo].set3 === 5 &&
      this.state.workout[exerciseNo].set4 === 5 &&
      this.state.workout[exerciseNo].set5 === 5) {
      this.stopTimer();
      this.setSeconds(0);
      this.setState({
        workout: {
          ...this.state.workout,
          [exerciseNo]: { ...this.state.workout[exerciseNo], done: '5x5' }
        }
      });
    } else if (this.state.workout[exerciseNo].set1 > 0 &&
      this.state.workout[exerciseNo].set2 > 0 &&
      this.state.workout[exerciseNo].set3 > 0 &&
      this.state.workout[exerciseNo].set4 > 0 &&
      this.state.workout[exerciseNo].set5 > 0) {
      this.stopTimer();
      this.setSeconds(0);
      this.setState({
        workout: {
          ...this.state.workout,
          [exerciseNo]: { ...this.state.workout[exerciseNo], done: 'almost' }
        }
      });
    } else {
      this.setState({
        workout: {
          ...this.state.workout,
          [exerciseNo]: { ...this.state.workout[exerciseNo], done: '' }
        }
      });
      this.runTimer(exerciseNo, setNo)
    }
  };

  onWorkoutSave = async () => {
    const exercises = this.state.workout.type === 'a' ? ['Bench Press', 'Barbell Row'] : ['Overhead Press', 'Deadlift']
    const historyData = {
      exercise1: this.state.workout.exercise1.done,
      exercise2: this.state.workout.exercise2.done,
      exercise3: this.state.workout.exercise3.done,
      Squat: this.user.workouts.strongLifts.Squat,
      [exercises[0]]: this.user.workouts.strongLifts[exercises[0]],
      [exercises[1]]: this.user.workouts.strongLifts[exercises[1]]
    };
    const data = {
      history: { ...this.user.workouts.history, [Date.now()]: historyData },
      strongLifts: {
        ...this.user.workouts.strongLifts,
        Squat: historyData.exercise1 === '5x5' ? this.user.workouts.strongLifts.Squat + 2.5 : this.user.workouts.strongLifts.Squat,
        [exercises[0]]: historyData.exercise2 === '5x5' ? this.user.workouts.strongLifts[exercises[0]] + 2.5 : this.user.workouts.strongLifts[exercises[0]],
        [exercises[1]]: historyData.exercise3 === '5x5' ? this.user.workouts.strongLifts[exercises[1]] + 2.5 : this.user.workouts.strongLifts[exercises[1]],
        trainingType: this.state.workout.type === 'a' ? 'b' : 'a'
      }
    };
    this.setState({ isLoading: true })
    await database().ref(`users/${this.user.id}/workouts`).update({ ...data })
    this.props.addWorkout5x5(this.user, data);
    this.setState({ isLoading: false, showSaveModal: false })
    this.props.history.goBack();
  };
  onQuit = async () => {    
    await this.setState({ showQuitModal: false });
    this.props.history.goBack();
  }
  
  componentWillUnmount() {
    this.stopTimer();
  };

  render() {
    const exercises = [{
      exerciseName: 'Squat',
      exerciseSets: this.state.workout.exercise1,
    }, {
      exerciseName: this.state.workout.type === 'a' ? 'Bench Press' : 'Overhead Press',
      exerciseSets: this.state.workout.exercise2,
    }, {
      exerciseName: this.state.workout.type === 'a' ? 'Barbell Row' : 'Deadlift',
      exerciseSets: this.state.workout.exercise3,
    }];
    return (
      <View style={styles.container}>
        <StatusBar hidden animated />
        <View style={styles.timer}>
          <Text style={styles.rest}>Rest: <Timer time={0} height={40} onFinish={this.stopTimer} ref={this.timer} /></Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.workoutContainer}>
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
        </ScrollView>
        <ConfirmFooter
          confirmText='Save Workout'
          confirmIcon='save'
          confirmIconType='fa5'
          onConfirm={() => this.setState({ showSaveModal: true })}
          disableConfirm={!(this.state.workout.exercise1.done && this.state.workout.exercise2.done && this.state.workout.exercise3.done)}
          onCancel={() => this.setState({ showQuitModal: true })}
          cancelText='Quit'
          cancelIcon='ban'
          cancelIconType='fa5'
        />
        <ModalConfirm
          title='Well Done!'
          subtitle='Would you like to save your workout?'
          visible={this.state.showSaveModal}
          setVisible={e => this.setState({ showSaveModal: e })}
          onConfirm={this.onWorkoutSave}
          isLoading={this.state.isLoading}
          width={300}
        />
        <ModalConfirm
          title='Are you sure you want to quit?'
          subtitle='Your progress will not be saved?!'
          visible={this.state.showQuitModal}
          setVisible={e => this.setState({ showQuitModal: e })}
          onConfirm={this.onQuit}
          confirmText='Quit'
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
    flexDirection: 'row',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    elevation: 10,
  },
  rest: {
    color: themeColors.offWhite,
    fontSize: 35,
  },
  workoutContainer: {
    marginTop: 20,
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 15,
    width: '100%',
  }
});

const mapDispatchToProps = (dispatch) => ({
  addWorkout5x5: (user, data) => dispatch(addWorkout5x5(user, data))
})

export default connect(undefined, mapDispatchToProps)(Workout5x5);