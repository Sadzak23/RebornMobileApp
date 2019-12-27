import React from 'react';
import { connect } from 'react-redux';
import { startRemoveTimer, startSetTimers, startEditTimer } from '../../actions/timers';
import { onRemoveAlert, onReorder } from '../Elements/Alerts';
import { ListItemIndex, ListItemTitle, ListItemBtns } from '../Elements/List';

export const SingleTimer = ({ id, index, name, rounds, intervals, startRemoveTimer, startEditTimer, startSetTimers, timers }) => {
  // Delete timer confirmation
  const onRemoveTimer = () => onRemoveAlert(startRemoveTimer, id, name, timers, index, startEditTimer, startSetTimers);
  const onTimerReorder = () => onReorder(timers, index, name, startEditTimer, startSetTimers);
  const exerciseNo = intervals.reduce((count, interval) => interval.intervalType === "exercise" ? count + 1 : count, 0)

  return (
    <div className="list-item">
      <ListItemIndex index={index} />
      <ListItemTitle
        linkPath={`/timer/${id}`}
        title={name}
        subtitle={`${exerciseNo} exercises - ${rounds} rounds`}
      />
      <ListItemBtns
        editLink={`/edit-timer/${id}`}
        onSort={onTimerReorder}
        onRemove={onRemoveTimer}
      />
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  startSetTimers: () => dispatch(startSetTimers()),
  startEditTimer: (id, updates) => dispatch(startEditTimer(id, updates)),
  startRemoveTimer: (id) => dispatch(startRemoveTimer(id))
});

export default connect(undefined, mapDispatchToProps)(SingleTimer);
