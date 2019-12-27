import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { BackButton, } from 'react-router-native';
import { timerColors } from '../common/ColorMap';
import { ButtonIcon } from '../common';
//import shortBeep from '../../sounds/beep.mp3'

const add0 = (num) => ("0" + num).slice(-2);
const formatSeconds = (seconds) => {
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${add0(minutes)}:${add0(seconds)}`;
  }
  else {
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    const hours = Math.floor(minutes / 60)
    minutes = minutes % 60;
    return `${add0(hours)}:${add0(minutes)}:${add0(seconds)}`;
  }
};

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    if (props.timer.warmupTime > 0) {
      this.state = {
        color: "#1dc4f2",
        intervalNo: -1,
        paused: true,
        phase: "Warmup",
        miliseconds: props.timer.warmupTime * 1000,
        seconds: props.timer.warmupTime,
        type: "warmup",
        timerRun: null
      }
    } else {
      this.state = {
        color: props.timer.intervals[0].intervalColor,
        intervalNo: 0,
        paused: true,
        phase: props.timer.intervals[0].intervalName,
        miliseconds: props.timer.intervals[0].intervalSec * 1000 + props.timer.intervals[0].intervalMin * 60000,
        seconds: props.timer.intervals[0].intervalSec + props.timer.intervals[0].intervalMin * 60,
        type: props.timer.intervals[0].intervalType,
        timerRun: null
      }
    };
  };

  // Get all intervals
  getIntervals = () => {
    let intervals = []
    for (let i = 1; i <= this.props.timer.rounds; i++) {
      const rest = {
        intervalColor: Object.keys(timerColors)[3],
        intervalMin: this.props.timer.roundRestMin,
        intervalName: `Round ${i} complete`,
        intervalSec: this.props.timer.roundRestSec,
        intervalType: "rest"
      }
      this.props.timer.intervals.map(e => intervals.push(e))
      i < this.props.timer.rounds && intervals.push(rest)
    }
    return intervals
  };
  // All timer intervals
  intervals = this.getIntervals();

  // Load Sound
  beep = '' //new Audio(shortBeep);
  longBeep = ''//new Audio('../assets/beep0.mp3');

  tick = () => {
    this.setState({ miliseconds: this.state.miliseconds - 100 });
    //Next interval
    if (this.state.miliseconds === 0) {
      this.handleNext();
      this.longBeep.play();  // Play sound on 0
      // Last interval
      if (this.state.intervalNo + 1 === this.intervals.length) {
        if (this.state.miliseconds === 0) {
          clearInterval(this.state.timerRun);
          this.setState({ paused: true });
          this.longBeep.play();  // Play sound on END TIMER
        }
      };
    };
    // Play sound on 3,2,1
    (this.state.miliseconds === 3000 || this.state.miliseconds === 2000 || this.state.miliseconds === 1000) && this.beep.play();
    // Play sound on 10
    (this.state.miliseconds === 10000 && this.state.seconds >= 15) && this.beep.play();
  };

  handleNext = () => {
    if (this.state.intervalNo + 1 < this.intervals.length) {
      this.setState({
        color: this.intervals[this.state.intervalNo + 1].intervalColor,
        phase: this.intervals[this.state.intervalNo + 1].intervalName,
        miliseconds: this.intervals[this.state.intervalNo + 1].intervalSec * 1000 + this.intervals[this.state.intervalNo + 1].intervalMin * 60000,
        seconds: this.intervals[this.state.intervalNo + 1].intervalSec + this.intervals[this.state.intervalNo + 1].intervalMin * 60,
        type: this.intervals[this.state.intervalNo + 1].intervalType,
        intervalNo: this.state.intervalNo + 1
      });
    };
  };

  handlePrevious = () => {
    if (this.state.intervalNo > 0) {
      const interval = this.intervals[this.state.intervalNo - 1]
      this.setState({
        color: interval.intervalColor,
        phase: interval.intervalName,
        miliseconds: interval.intervalSec * 1000 + interval.intervalMin * 60000,
        seconds: interval.intervalSec + interval.intervalMin * 60,
        type: interval.intervalType,
        intervalNo: this.state.intervalNo - 1
      });
    };
  };

  togglePause = () => {
    this.setState({
      paused: !this.state.paused
    });
    if (!this.state.paused) {
      clearInterval(this.state.timerRun);
    } else {
      this.setState({ timerRun: setInterval(this.tick, 100) });
    }
  };

  componentWillUnmount() {
    clearInterval(this.state.timerRun);
  };
  render() {
    const history = useHistory();
    //Exercise number calculator
    const exerciseNo = this.intervals.slice(0, this.state.intervalNo + 1).reduce((count, interval) =>
      interval.intervalType === "exercise" ? count + 1 : count, 0);
    //Total exercise number
    const totalExercisesNo = this.intervals.reduce((count, interval) =>
      interval.intervalType === "exercise" ? count + 1 : count, 0);
    //Elapsed Time
    const elapsedTime = this.intervals.slice(
      0, this.state.intervalNo + 1).reduce(
        (time, interval) => interval.intervalSec + interval.intervalMin * 60 + time, 0) -
      Math.ceil(this.state.miliseconds / 1000);
    //Remaining time
    const remainingTime = this.intervals.reduce((time, interval) => interval.intervalSec + interval.intervalMin * 60 + time, 0) - elapsedTime;

    return (
      <View style={styles.container}>
        <StatusBar hidden animated />
        <BackButton />
        <View>
          <Text style={styles.timerClock}>{formatSeconds(Math.ceil(this.state.miliseconds / 1000))}</Text>
        </View>
        <View>
          <View style={styles.timerInfo}>
            <View>
              <Text>Elapsed Time</Text>
              <Text style={styles.timerInfoValue}>{elapsedTime < 0 ? "00:00" : formatSeconds(elapsedTime)}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text>Exercise</Text>
              <Text style={styles.timerInfoValue}>{add0(exerciseNo)} / {add0(totalExercisesNo)}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text>Time Remaining</Text>
              <Text style={styles.timerInfoValue}>{formatSeconds(remainingTime)}</Text>
            </View>
          </View>

          <ButtonIcon onPress={btn} icon='play' iconType='fa' size={30} />
          <View style={styles.controlsContainer}>
            <ButtonIcon onPress={this.handlePrevious} icon='backward' iconType='fa' size={30} />
            <ButtonIcon onPress={this.togglePause} icon={this.state.paused ? 'play' : 'pause'} iconType='fa' size={30} />
            <ButtonIcon onPress={this.handleNext} icon='forward' iconType='fa' size={30} />
          </View>
        </View>
      </View>
    );
  };
}