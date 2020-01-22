import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ValueUnit, themeColors, HorisontalField } from '../../common';

const resultBMI = (bmi, range) => {
  if (bmi < 18.5) return range[0].status;
  else if (bmi >= 18.5 && bmi < 25) return range[1].status;
  else if (bmi >= 25 && bmi < 30) return range[2].status;
  else if (bmi >= 30) return range[3].status;
}

export const BmiCalculator = ({ height, weight }) => {
  const bmi = Math.round((weight / Math.pow((height / 100), 2)) * 10) / 10
  const bmiRange = [
    { range: '<18.5', color: 'skyblue', status: 'Underweight' },
    { range: '18.5 - 25', color: 'green', status: 'Healthy' },
    { range: '25 - 30', color: 'orange', status: 'Overweight' },
    { range: '>30', color: 'red', status: 'Obese' },
  ]
  const result = resultBMI(bmi, bmiRange)
  return (
    <View>
      {height && weight ?
        <View style={styles.container}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <HorisontalField title='BMI' value={bmi} unit='kg/m2' valueSize={22} />
            <HorisontalField title='Weight status' value={result} valueSize={22} />            
          </View>

          <View style={styles.rangeContainer}>
            {bmiRange.map(range => (
              <View key={range.status}
                style={[styles.rangeField,
                { backgroundColor: range.color },
                (range.status === result) && styles.currentRange
                ]}
              >
                <Text style={styles.rangeVal}>{range.range}</Text>
              </View>
            ))}
          </View>
        </View>
        : <Text>Please enter height & weight</Text>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.theme2,
    borderWidth: 1,
    borderColor: themeColors.offBlack,
    borderRadius: 10,
    elevation: 10,
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
    width: '100%',
  },
  status: { color: '#fff', fontSize: 25 },
  rangeContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    width: '95%',
  },
  rangeField: { flex: 1, opacity: 0.15 },
  currentRange: { opacity: 1, marginHorizontal: 2, elevation: 5 },
  rangeVal: { textAlign: 'center', color: '#fff', paddingVertical: 5 }
})