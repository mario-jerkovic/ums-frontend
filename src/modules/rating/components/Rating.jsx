'use strict';

import React, {Component, PropTypes} from 'react';
import HelpSideBar from './HelpSideBar'
import HelpBtn from './HelpBtn'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleHelperSidebar, toggleGenderStatSidebar} from '../actions'

import '../styles/side-bar-right.styl'

class Rating extends React.Component {
  render() {
    console.log('this.props', this.props);
    const { SpecofferChooser, RatingList, SearchEnrolment } = this.props;
    const { openHelperSidebar, closeHelperSidebar, helpIsOpen } = this.props;
    // const { openGenderStatSidebar, closeGenderStatSidebar, genderStatIsOpen } = this.props;

    return (
      <div className="rating">
        <HelpSideBar isOpen={helpIsOpen} close={closeHelperSidebar} />
        <div className="rating__specoffer-chooser">
          {SpecofferChooser}
        </div>
        <div className="rating__rating-list">
          <HelpBtn openHelperSidebar={openHelperSidebar}/>
          <div>{SearchEnrolment}</div>
          <div>{RatingList}</div>
        </div>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    helpIsOpen: state.rating.sideBar.helpIsOpen,
    genderStatIsOpen: state.rating.sideBar.genderStatIsOpen,
  }
}, (dispath) => {
  return bindActionCreators({
    openHelperSidebar: toggleHelperSidebar(),
    closeHelperSidebar: toggleHelperSidebar(false),
    openGenderStatSidebar: toggleGenderStatSidebar,
    closeGenderStatSidebar: toggleGenderStatSidebar(false),
  }, dispath)
})(Rating)