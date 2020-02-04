import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { BackButton, useHistory } from 'react-router-native';
import { timers } from '../../data';
import { List, ButtonText, listStyles, themeColors, FlatListSeparator } from '../common';

export const TimersList = () => {
  const history = useHistory();
  return (
    <View>
      <FlatList
        style={listStyles.list}
        data={timers}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={listStyles.listItem} key={item.name}>
            <ButtonText
              onPress={() => history.push({
                pathname: `/workout-timer/${item.id}`,
                state: item
              })}
              text={`${index + 1}. ${item.name}`}
              blankStyle
            />
          </View>
        )}
        ItemSeparatorComponent={() => <FlatListSeparator />}
      />
      <BackButton />
    </View>
  )
};

