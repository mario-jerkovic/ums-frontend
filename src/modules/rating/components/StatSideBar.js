import React, {Component} from 'react';
import {stack as Menu} from 'react-burger-menu';
import Chart from '../../statistics/containers/Chart';
import * as types from '../../statistics/constants';

export default class StatSideBar extends Component {

  static PropTypes = {
    close: React.PropTypes.func.isRequired,
    isOpen: React.PropTypes.bool.isRequired
  };

  stateChanged = (state) => {
    if (!state.isOpen) {
      this.props.close()
    }
  };

  render() {
    let { isOpen, specofferId } = this.props;
    let chartId = types.GENDER;
    return (
      <Menu right onStateChange={this.stateChanged}  isOpen={isOpen} width={700}>
        {isOpen &&
          <div>
            <Chart chartId={chartId} params={{chartId}} requestParams={{specofferId}}/>
          </div>}
      </Menu>
    )
  }
}

