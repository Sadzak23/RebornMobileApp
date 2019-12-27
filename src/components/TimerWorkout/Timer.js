import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { BackButton } from 'react-router-native';
import KeepAwake from 'react-native-keep-awake';
import { timerColors, themeColors } from '../common/ColorMap';
import { ButtonIcon } from '../common';
import { shortBeep, longBeep } from '../../sounds/sounds';
import { add0, formatSeconds } from '../common';

export class Timer extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.location.state.warmupTime > 0) {
      this.state = {
        color: "#1dc4f2",
        intervalNo: -1,
        paused: true,
        phase: "Warmup",
        seconds: this.props.location.state.warmupTime,
        totalSeconds: this.props.location.state.warmupTime,
        type: "warmup",
        timerRun: null,
        timeStamp: null
      }
    } else {
      this.state = {
        color: this.props.location.state.intervals[0].intervalColor,
        intervalNo: 0,
        paused: true,
        phase: this.props.location.state.intervals[0].intervalName,
        seconds: this.props.location.state.intervals[0].intervalSec + this.props.location.state.intervals[0].intervalMin * 60,
        totalSeconds: this.props.location.state.intervals[0].intervalSec + this.props.location.state.intervals[0].intervalMin * 60,
        type: this.props.location.state.intervals[0].intervalType,
        timerRun: null,
        timeStamp: null
      }
    };
  };

  // Get all intervals
  getIntervals = () => {
    let intervals = []
    for (let i = 1; i <= this.props.location.state.rounds; i++) {
      const rest = {
        intervalColor: Object.keys(timerColors)[3],
        intervalMin: this.props.location.state.roundRestMin,
        intervalName: `Round ${i} complete`,
        intervalSec: this.props.location.state.roundRestSec,
        intervalType: "rest"
      }
      this.props.location.state.intervals.map(e => intervals.push(e))
      i < this.props.location.state.rounds && intervals.push(rest)
    }
    return intervals
  };
  // All timer intervals
  intervals = this.getIntervals();

  tick = () => {
    this.setState({
      seconds: this.state.totalSeconds - Math.round((Date.now() - this.state.timeStamp) / 1000)
    });
    //Next interval
    if (this.state.seconds <= 0) {
      this.handleNext();
      longBeep.play();  // Play sound on 0
      // Last interval
      if (this.state.intervalNo + 1 === this.intervals.length) {
        if (this.state.seconds <= 0) {
          this.onStopTimer();
          longBeep.play();  // Play sound on END TIMER
        }
      };
    };
    // Play sound on 3,2,1
    (this.state.seconds === 3 || this.state.seconds === 2 || this.state.seconds === 1) && shortBeep.play();
    // Play sound on 10
    (this.state.seconds === 10 && this.state.totalSeconds >= 15) && shortBeep.play();
  };

  togglePause = () => {
    this.state.paused ? this.onRunTimer() : this.onStopTimer();
  };  
  onRunTimer = () => {
    KeepAwake.activate()
    this.setState({
      paused: false,
      timerRun: setInterval(this.tick, 1000),
      timeStamp: Date.now()
    })
  };
  onStopTimer = () => {
    KeepAwake.deactivate()
    clearInterval(this.state.timerRun)
    this.setState({ paused: true, totalSeconds: this.state.seconds })
  };

  handleNext = () => {
    if (this.state.intervalNo + 1 < this.intervals.length) {
      if (!this.state.paused) {
        this.onStopTimer()
        this.onRunTimer()
      }
      this.setState({
        color: this.intervals[this.state.intervalNo + 1].intervalColor,
        phase: this.intervals[this.state.intervalNo + 1].intervalName,
        seconds: this.intervals[this.state.intervalNo + 1].intervalSec + this.intervals[this.state.intervalNo + 1].intervalMin * 60,
        totalSeconds: this.intervals[this.state.intervalNo + 1].intervalSec + this.intervals[this.state.intervalNo + 1].intervalMin * 60,
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
        seconds: interval.intervalSec + interval.intervalMin * 60,
        totalSeconds: interval.intervalSec + interval.intervalMin * 60,
        type: interval.intervalType,
        intervalNo: this.state.intervalNo - 1,
        timeStamp: Date.now()
      });
    };
  };

  componentWillUnmount() {
    KeepAwake.deactivate()
    clearInterval(this.state.timerRun);
  };

  render() {
    //Exercise number calculator
    const exerciseNo = this.intervals.slice(0, this.state.intervalNo + 1)
      .reduce((count, interval) => interval.intervalType === "exercise" ? count + 1 : count, 0);
    //Total exercise number
    const totalExercisesNo = this.intervals.reduce((count, interval) =>
      interval.intervalType === "exercise" ? count + 1 : count, 0);
    //Elapsed Time
    const elapsedTime = this.intervals.slice(0, this.state.intervalNo + 1)
      .reduce((time, interval) => interval.intervalSec + interval.intervalMin * 60 + time, 0) - Math.ceil(this.state.seconds);
    //Remaining time
    const remainingTime = this.intervals.reduce((time, interval) => interval.intervalSec + interval.intervalMin * 60 + time, 0) - elapsedTime;

    return (
      <View style={{...styles.container, backgroundColor: this.state.color}}>
        <StatusBar hidden animated />
        <BackButton />
        <View>
          <Text style={styles.timerName}>{this.props.location.state.name}</Text>
          <Text style={styles.timerClock}>{formatSeconds(Math.ceil(this.state.seconds))}</Text>
          <Text style={styles.timerIntervalName}>- {this.state.phase} -</Text>
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
          <View style={styles.controlsContainer}>
            <View style={{ flex: 1 }}>
              <ButtonIcon onPress={this.handlePrevious} icon='backward' iconType='fa5' size={30} style={styles.controlBtns} />
            </View>
            <View style={{ flex: 1 }}>
              <ButtonIcon onPress={this.togglePause} icon={this.state.paused ? 'play' : 'pause'} iconType='fa5' size={30} style={styles.controlBtns} />
            </View>
            <View style={{ flex: 1 }}>
              <ButtonIcon onPress={this.handleNext} icon='forward' iconType='fa5' size={30} style={styles.controlBtns} />
            </View>
          </View>
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  timerName: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  timerClock: {
    fontSize: 140,
    textAlign: 'center',
    marginVertical: -15,
  },
  timerIntervalName: {
    fontSize: 30,
    textAlign: 'center',
  },
  timerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  timerInfoValue: {
    fontSize: 25
  },
  controlsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  controlBtns: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: themeColors.offWhite,
    paddingVertical: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  }
});