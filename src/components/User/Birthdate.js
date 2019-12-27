import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export class Birthdate extends React.Component {
  constructor(props) {
    super(props);
    const birthdate = props.location.state.birthdate
    this.state = {
      date: '',
      day: birthdate ? new Date(birthdate).getDate() : "",
      month: birthdate ? new Date(birthdate).getMonth() + 1 : "",
      year: birthdate ? new Date(birthdate).getFullYear() : "",
    }
  };

  onDayChange = (e) => {
    const day = e.target.value;
    if (!day || day.match(/^\d{1,2}$/)) {
      this.setState({ day }, () => {
        this.setState({ date: Date.parse(`${this.state.month} ${this.state.day} ${this.state.year}`) }, () => {
          this.props.onBdayChange(this.state.date)
        })
      });
    }
  };
  onMonthChange = (e) => {
    const month = e.target.value;
    if (!month || month.match(/^\d{1,2}$/)) {
      this.setState({ month }, () => {
        this.setState({ date: Date.parse(`${this.state.month} ${this.state.day} ${this.state.year}`) }, () => {
          this.props.onBdayChange(this.state.date)
        })
      });
    }
  };
  onYearChange = (e) => {
    const year = e.target.value;
    if (!year || year.match(/^\d{1,4}$/)) {
      this.setState({ year }, () => {
        this.setState({ date: Date.parse(`${this.state.month} ${this.state.day} ${this.state.year}`) }, () => {
          this.props.onBdayChange(this.state.date)
        })
      });
    }
  };


  render() {
    return (
      <View>
        <Text>Birthdate: </Text>
        <View>
          <Text>Day: </Text>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            onChangeText={this.onDayChange}
            value={this.state.day}
            placeholder='1'
          //placeholderTextColor={themeColors.transparentBlack}
          />
          <Text>
            Month:
            </Text>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            onChangeText={this.onMonthChange}
            value={this.state.month}
            placeholder='1'
          />
          <Text>Year: </Text>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            onChangeText={this.onYearChange}
            value={this.state.year}
            placeholder='1990'
          />
        </View>
      </View>
    )
  };
};

const styles = StyleSheet.create({
  loginContainer: {
    //backgroundColor: themeColors.transparentWhite,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderRadius: 25,
    marginBottom: 20
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    marginVertical: 10,
    //color: themeColors.transparentBlack,
  },
  icon: {
    marginHorizontal: 15,
  },
  text: {
    //color: '#fff',
    fontSize: 20
  },
});