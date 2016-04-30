'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import { createSelector } from 'reselect';
import {TIMEPERIODS} from './../../dictionaries/constants';
import {isDictLoaded} from './../../dictionaries/helpers';
import loadDictionaries from './../../dictionaries/actions';
import {changeTimePeriodId} from './../duck';
import Loader from 'loader'

let optionsList = (timeperiods) => {
  return timeperiods.map((item, i) => <option value={i} key={i}>{item}</option>)
};

class TimePeriodId extends Component {

  componentDidMount() {
    this.props.loadDictionaries(TIMEPERIODS);
  }

  handleOptionChange = (event) => {
    this.props.sendTimePeriodId(event.target.value);
  }

  render() {
    let { isDictLoadedProp, timeperiods, timePeriodId } = this.props;

    return (
    <Loader className="body" isLoading={!isDictLoadedProp}>
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Оберіть вступну кампанію</ControlLabel>
        <FormControl componentClass="select" placeholder="Оберіть вступну кампанію"
            value={timePeriodId} onChange={this.handleOptionChange}>
          { optionsList(timeperiods) }
        </FormControl>
      </FormGroup>
    </Loader>
    );
  }
}


TimePeriodId.propTypes = {
  isDictLoadedProp: PropTypes.bool.isRequired,
  timeperiods: PropTypes.arrayOf(PropTypes.string).isRequired,
  timePeriodId: PropTypes.string.isRequired,
  sendTimePeriodId: PropTypes.func.isRequired,
  loadDictionaries: PropTypes.func.isRequired,
};

export const mapStateToSettings = createSelector(
  [ (state) => state.dictionaries,
   (state) => state.settings.timePeriodId],
  (dictionaries, timePeriodId) => ({
    isDictLoadedProp: isDictLoaded(TIMEPERIODS, dictionaries),
    timeperiods: dictionaries[TIMEPERIODS].resourcesMap,
    timePeriodId: timePeriodId.toString()
  })
);

const mapDispatchToSettings = (dispatch) => ({
  sendTimePeriodId: (timePeriodId) => {
    dispatch(changeTimePeriodId(timePeriodId));
  },
  loadDictionaries: (dictList) => {
    dispatch(loadDictionaries(dictList));
  }
});

export default connect(
  mapStateToSettings,
  mapDispatchToSettings
)(TimePeriodId);
