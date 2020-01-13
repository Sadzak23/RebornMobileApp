import React from 'react';
import { Text } from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import { themeColors } from './ColorMap';
import { formatSeconds, } from './Format';
import { shortBeep, longBeep } from '../../sounds/sounds';

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      seconds: this.props.time,
      totalSeconds: this.props.time,
      timerRun: null,
      timestamp: null
    };
  };
  setSeconds = (seconds) => this.setState({ seconds, totalSeconds: seconds })
  setTimestamp = (timestamp) => this.setState({ timestamp })

  tick = () => {
    const seconds = this.state.totalSeconds - Math.round((Date.now() - this.state.timestamp) / 1000)
    this.setState({ seconds });
    !!this.props.updateSeconds && this.props.updateSeconds(seconds)
    if (this.state.seconds <= 0) {
      this.props.onFinish()
      longBeep.play();  // Play sound on END TIMER
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
    if (this.state.seconds > 0) {
      KeepAwake.activate()
      !!this.props.setPaused && this.props.setPaused(false)
      this.setState({
        paused: false,
        timerRun: setInterval(this.tick, 1000),
        timestamp: Date.now()
      })
    }
  };
  onStopTimer = () => {
    KeepAwake.deactivate()
    clearInterval(this.state.timerRun)
    !!this.props.setPaused && this.props.setPaused(true)
    this.setState({ paused: true, totalSeconds: this.state.seconds })
  };

  componentWillUnmount() {
    KeepAwake.deactivate()
    clearInterval(this.state.timerRun);
  };

  render() {
    const height = this.props.height ? this.props.height : 140
    return <Text
      style={{
        color: themeColors.offWhite,
        fontSize: height,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: -15,
      }}>
      {formatSeconds(Math.ceil(this.state.seconds))}
    </Text>
  };
};