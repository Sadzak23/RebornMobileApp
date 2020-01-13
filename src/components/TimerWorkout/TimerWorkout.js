import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { BackButton } from 'react-router-native';
import { ButtonIcon, add0, formatSeconds, Timer, themeColors, timerColors } from '../common';

export const TimerWorkout = ({ location }) => {
  const initialSeconds = location.state.warmupTime > 0 ? location.state.warmupTime :
  location.state.intervals[0].intervalSec + location.state.intervals[0].intervalMin * 60;
  const [color, setColor] = useState(location.state.warmupTime > 0 ? '#1dc4f2' : location.state.intervals[0].intervalColor)
  const [intervalNo, setIntervalNo] = useState(location.state.warmupTime > 0 ? -1 : 0)
  const [phase, setPhase] = useState(location.state.warmupTime > 0 ? 'Warmup' : location.state.intervals[0].intervalName)
  const [paused, setPaused] = useState(true)
  const timer = useRef()
  // Ovo je diskutabilno??? 
  const [seconds, updateSeconds] = useState(initialSeconds);
  //
  const onTogglePause = () => timer.current.togglePause();
  const setSeconds = (sec) => timer.current.setSeconds(sec);
  const setTimestamp = (timestamp) => timer.current.setTimestamp(timestamp);

  // Get all intervals
  const getIntervals = () => {
    let intervals = []
    for (let i = 1; i <= location.state.rounds; i++) {
      const rest = {
        intervalColor: Object.keys(timerColors)[3],
        intervalMin: location.state.roundRestMin,
        intervalName: `Round ${i} complete`,
        intervalSec: location.state.roundRestSec,
        intervalType: 'rest'
      }
      location.state.intervals.map(e => intervals.push(e))
      i < location.state.rounds && intervals.push(rest)
    }
    return intervals
  };
  const intervals = getIntervals();

  const onFinish = () => {
    handleNext()
    // Last interval
    if (intervalNo + 1 === intervals.length) {
      if (timer.current.state.seconds <= 0) {
        timer.current.onStopTimer()
        // longBeep.play();  // Play sound on END TIMER
      }
    }
  };

  const handleNext = () => {
    if (intervalNo + 1 < intervals.length) {
      if (!timer.current.state.paused) {
        timer.current.onStopTimer()
        setSeconds(intervals[intervalNo + 1].intervalSec + intervals[intervalNo + 1].intervalMin * 60)
        timer.current.onRunTimer()
      } else {
        setSeconds(intervals[intervalNo + 1].intervalSec + intervals[intervalNo + 1].intervalMin * 60)
      }
      updateSeconds()
      setColor(intervals[intervalNo + 1].intervalColor)
      setPhase(intervals[intervalNo + 1].intervalName)
      setIntervalNo(intervalNo + 1)
    };
  };
  const handlePrevious = () => {
    if (intervalNo > 0) {
      const interval = intervals[intervalNo - 1]
      setSeconds(interval.intervalSec + interval.intervalMin * 60)
      setTimestamp(Date.now())
      setColor(interval.intervalColor)
      setPhase(interval.intervalName)
      setIntervalNo(intervalNo - 1)
    };
  };

  //Exercise number calculator
  const exerciseNo = intervals.slice(0, intervalNo + 1)
    .reduce((count, interval) => interval.intervalType === 'exercise' ? count + 1 : count, 0);
  //Total exercise number
  const totalExercisesNo = intervals.reduce((count, interval) =>
    interval.intervalType === 'exercise' ? count + 1 : count, 0);
  //Elapsed Time
  const elapsedTime = intervals.slice(0, intervalNo + 1)
    .reduce((time, interval) => interval.intervalSec + interval.intervalMin * 60 + time, 0) - Math.ceil(timer.current ? timer.current.state.seconds : 0);
  //Remaining time
  const remainingTime = intervals.reduce((time, interval) => interval.intervalSec + interval.intervalMin * 60 + time, 0) - elapsedTime;

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <StatusBar hidden animated />
      <BackButton />
      <View>
        <Text style={styles.timerName}>{location.state.name}</Text>
        <Timer
          time={initialSeconds}
          ref={timer}
          onFinish={onFinish}
          setPaused={setPaused}
          updateSeconds={updateSeconds}
        />
        <Text style={styles.timerIntervalName}>- {phase} -</Text>
      </View>
      <View>
        <View style={styles.timerInfo}>
          <View>
            <Text>Elapsed Time</Text>
            <Text style={styles.timerInfoValue}>{elapsedTime < 0 ? '00:00' : formatSeconds(elapsedTime)}</Text>
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
            <ButtonIcon icon='backward' iconType='fa5' size={30}
              onPress={handlePrevious} style={styles.controlBtns} />
          </View>
          <View style={{ flex: 1 }}>
            <ButtonIcon onPress={onTogglePause} style={styles.controlBtns}
              icon={paused ? 'play' : 'pause'} iconType='fa5' size={30} />
          </View>
          <View style={{ flex: 1 }}>
            <ButtonIcon icon='forward' iconType='fa5' size={30}
              onPress={handleNext} style={styles.controlBtns} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  timerName: {
    color: themeColors.offWhite,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  timerClock: {
    color: themeColors.offWhite,
    fontSize: 140,
    textAlign: 'center',
    marginVertical: -15,
  },
  timerIntervalName: {
    color: themeColors.offWhite,
    fontSize: 30,
    textAlign: 'center',
  },
  timerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  timerInfoValue: {
    color: themeColors.offWhite,
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