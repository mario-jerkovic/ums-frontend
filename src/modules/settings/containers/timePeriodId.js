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

class TimePeriodId extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadDictionaries([TIMEPERIODS]);
  }

  handleOptionChange = (event) => {
    this.props.sendTimePeriodId(event.target.value);
  }

  render() {

    let { isDictLoadedProp, timeperiods, timePeriodId } = this.props;

    if (!isDictLoadedProp) {
      return <Loader className="body" isLoading />
    }

    const optionList = timeperiods.map((item, i) => {
      return <option value={i} key={i}>{item}</option>;
    });

    return (
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Оберіть вступну кампанію</ControlLabel>
        <FormControl componentClass="select" placeholder="Оберіть вступну кампанію"
            value={timePeriodId} onChange={this.handleOptionChange}>
          { optionList }
        </FormControl>
      </FormGroup>
    );
  }
}


TimePeriodId.propTypes = {
  children: PropTypes.any
};

export const mapStateToSettings = createSelector(
  [ (state) => state.dictionaries,
   (state) => state.settings.timePeriodId],
  (dictionaries, timePeriodId) => ({
    isDictLoadedProp: isDictLoaded([TIMEPERIODS], dictionaries),
    timeperiods: dictionaries[TIMEPERIODS].resourcesMap,
    timePeriodId: timePeriodId
  })
);

const mapDispatchToSettings = (dispatch) => {
  return {
    sendTimePeriodId: (timePeriodId) => {
      dispatch(changeTimePeriodId(timePeriodId));
    },
    loadDictionaries: (dictList) => {
      dispatch(loadDictionaries(dictList));
    }
  };
};

export default connect(
  mapStateToSettings,
  mapDispatchToSettings
)(TimePeriodId);
