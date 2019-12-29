import React from 'react';
import { ActivityCal } from './ActivityCal';
import * as moment from 'moment';
import { BtnBackFullWidth } from '../Elements/Buttons';

export const CalCalculator = ({ location }) => {
  const user = location.state
  const age = moment().diff(user.birthdate, 'years')

  return (
    <div className="content-container">
      <div className="cal-user-info">
        <h1>Hi {user.firstName}</h1>
        <h3>Age: {age} - Weight: {user.weight}kg</h3>
      </div>
      <ActivityCal user={user} />
      <BtnBackFullWidth />
    </div>
  )
}

export default CalCalculator;
