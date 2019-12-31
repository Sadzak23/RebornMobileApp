import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Modal, { ModalContent } from 'react-native-modals';
import { metActivity } from './CalMaps';
import { componentStyle } from '../../../styles';
import { Icon, ButtonIconText, themeColors, formatMinutes } from '../../common';
import { BackButton } from 'react-router-native';

export const CalCalculator = ({ user, fullWidth }) => {
  const [activity, setActivity] = useState("Running")
  const [activityPick, setActivityPick] = useState(false)
  const [met, setMet] = useState("6:00")
  const [metPick, setMetPick] = useState(false)
  const [checkDuration, setCheckDuration] = useState(true)
  const [duration, setDuration] = useState("")
  const [calNo, setCalNo] = useState("")
  const [resultCal, setResultCal] = useState(0)
  const [resultDuration, setResultDuration] = useState(0)

  const onActivitySelect = (e) => {
    setActivity(e);
    setMet(Object.keys(metActivity[e].met)[1])
    setActivityPick(false)
  }
  const onDurationChange = (durationVal) => {
    if (!durationVal || durationVal.match(/^\d{1,4}$/)) setDuration(durationVal);
  };
  const onCaloriesChange = (cal) => {
    if (!cal || cal.match(/^\d{1,5}$/)) setCalNo(cal);
  };
  const onCalculateDuration = () => {
    setResultCal(Math.round(user.weight * metActivity[activity].met[met] * duration / 60))
  };
  const onCalculateCal = () => {
    setResultDuration(Math.round(calNo / user.weight / metActivity[activity].met[met] * 60))
  };

  useEffect(() => {
    onCalculateCal();
  }, [calNo, met, activity])

  useEffect(() => {
    onCalculateDuration()
  }, [duration, met, activity])

  return (
    <ScrollView>
      <View style={{ width: fullWidth, marginBottom: 70 }}>
        <View style={styles.titleContainer}>
          <Text style={componentStyle.title}>Calories Calculator</Text>
          <Icon size={60} icon={metActivity[activity].icon} type='fa5' style={styles.icon} />
        </View>
        {/* Calculator Type */}
        <View style={styles.calculatorTypeContainer}>
          <TouchableOpacity
            style={styles.typeSelect}
            onPress={() => setCheckDuration(!checkDuration)}
          >
            <Text style={styles.valueText}>Duration</Text>
            <Icon style={{ marginHorizontal: 5 }}
              icon={checkDuration ? 'toggle-switch-off' : 'toggle-switch'}
              size={45}
            />
            <Text style={styles.valueText}>Calories</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.widgetContainer}>
          <View style={{ marginHorizontal: 40 }}>
            {/* Activity Picker */}
            <View style={{ ...styles.listItem, borderTopWidth: 2 }}>
              <TouchableOpacity style={styles.listItemBtn} onPress={() => setActivityPick(true)} >
                <Text style={styles.label}>Select Activity:</Text>
                <Text style={styles.valueText}>{activity}</Text>
              </TouchableOpacity>
              <Modal visible={activityPick} onTouchOutside={() => setActivityPick(false)}>
                <ModalContent style={styles.modal}>
                  {Object.keys(metActivity).map(e => <ButtonIconText key={e} text={e} onPress={() => onActivitySelect(e)}
                    icon={metActivity[e].icon} iconType='fa5' iconStyle={styles.modalIcon}
                    blankStyle style={{ paddingVertical: 5 }}
                  />)}
                </ModalContent>
              </Modal>
            </View>

            {/* Met Picker */}
            <View style={styles.listItem}>
              <TouchableOpacity style={styles.listItemBtn} onPress={() => setMetPick(true)} >
                <Text style={styles.label}>{`${metActivity[activity].intensityLabel}: `}</Text>
                <Text style={styles.valueText}>{met}</Text>
              </TouchableOpacity>
              <Modal visible={metPick} onTouchOutside={() => setMetPick(false)}>
                <ModalContent style={styles.modal}>
                  {Object.keys(metActivity[activity].met).map(e => <ButtonIconText key={e} text={e} onPress={() => { setMet(e); setMetPick(false) }}
                    icon={metActivity[activity].icon} iconType='fa5' iconStyle={styles.modalIcon}
                    blankStyle style={{ paddingVertical: 5 }}
                  />)}
                </ModalContent>
              </Modal>
            </View>
            {/* Duration / Calories Input */}
            <View style={[styles.listItem, styles.listItemBtn, { marginBottom: 15 }]}>
              <Text style={styles.label}>{checkDuration ? 'Duration:' : 'Calories:'}</Text>
              <View style={styles.inputContainer}>
                <TextInput autoCorrect={false} style={styles.input}
                  onChangeText={e => checkDuration ? onDurationChange(e) : onCaloriesChange(e) && console.log(e)}
                  value={checkDuration ? duration : calNo}
                  placeholder='0'
                />
                <Text style={{ paddingBottom: 3 }}>{checkDuration ? 'min' : 'kCal'}</Text>
              </View>
            </View>
            {/* Render results */}
          </View>
        </View>
        {checkDuration ?
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>If you {metActivity[activity].resultLabel} for {formatMinutes(duration ? duration : 0)} min,</Text>
            <Text style={styles.resultText}>You would burn</Text>
            <Text style={styles.resultBold}>{resultCal.toFixed().replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&,')} kCal</Text>
          </View>
          :
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>To burn {calNo ? calNo.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&,') : 0} kCal,</Text>
            <Text style={styles.resultText}>You have to {metActivity[activity].resultLabel} for</Text>
            <Text style={styles.resultBold}>{formatMinutes(resultDuration)} min</Text>
          </View>
        }
        <View style={styles.mainBtnContainer}>
          <ButtonIconText text='Reset' onPress={() => { setCalNo(null); setDuration(null) }} style={styles.mainBtn} />
        </View>
        <BackButton />
      </View>
    </ScrollView>
  );
};
const mainContainer = {
  backgroundColor: themeColors.theme2,
  borderWidth: 2,
  borderColor: themeColors.offWhite,
  borderRadius: 20,  
  elevation: 20,
}
const styles = StyleSheet.create({
  titleContainer: { backgroundColor: themeColors.themeColor, paddingBottom: 30, elevation: 5 },
  widgetContainer: {
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: themeColors.themeColor,
    paddingTop: 45,
    paddingBottom: 60,
    marginHorizontal: 20,
  },
  icon: { marginTop: -10, paddingBottom: 10, textAlign: 'center' },
  calculatorTypeContainer: {
    ...mainContainer,
    marginTop: -30,
    marginBottom: -30,
    marginHorizontal: 30,
  },
  listItem: { borderBottomWidth: 2, borderColor: 'rgba(255, 255, 255, 0.5)', },
  listItemBtn: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modal: { backgroundColor: themeColors.body, paddingVertical: 10, },
  modalIcon: { width: 40, textAlign: 'center', marginRight: 10 },
  typeSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: { fontSize: 16 },
  valueText: { fontSize: 18, color: themeColors.offWhite, },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    color: themeColors.offWhite,
    flex: 1,
  },
  input: {
    textAlign: 'right',
    fontSize: 23,
    flex: 1,
    padding: 0,
  },
  resultContainer: {
    ...mainContainer,
    justifyContent: 'center',
    height: 120,
    marginHorizontal: 60,
    marginTop: -60
  },
  resultText: {
    color: themeColors.offWhite,
    fontSize: 20,
    textAlign: 'center',
  },
  resultBold: {
    color: themeColors.offWhite,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainBtnContainer: {
    marginHorizontal: 50,
    
  },
  mainBtn: {
    ...mainContainer,
    marginTop: 20,
  }
});

const mapStateToProps = (state) => ({
  user: state.user
})
export default connect(mapStateToProps)(CalCalculator);