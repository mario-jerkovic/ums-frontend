'use strict';

import React, {Component, PropTypes} from 'react'
import HelpSideBar from './HelpSideBar'
import StatSideBar from './StatSideBar'
import HelpBtn from './HelpBtn'
import StatBtn from './StatBtn'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toggleHelperSidebar, toggleGenderStatSidebar} from '../actions'
import '../styles/side-bar-right.styl'

class Rating extends React.Component {
  render() {
    const { SpecofferChooser, RatingList, SearchEnrolment, specofferId } = this.props;
    const { openHelperSidebar, closeHelperSidebar, helpIsOpen } = this.props;
    const { openGenderStatSidebar, closeGenderStatSidebar, genderStatIsOpen } = this.props;

    return (
      <div className="rating">
        <HelpSideBar isOpen={helpIsOpen} close={closeHelperSidebar} />
        <StatSideBar isOpen={genderStatIsOpen} close={closeGenderStatSidebar} specofferId={specofferId}/>
        <div className="rating__specoffer-chooser">
          {SpecofferChooser}
        </div>
        <div className="rating__rating-list">
          <HelpBtn openSidebar={openHelperSidebar}/>
          {specofferId && <StatBtn openSidebar={openGenderStatSidebar}/>}
          <div>{SearchEnrolment}</div>
          <div>{RatingList}</div>
        </div>
      </div>
    )
  }
}

export default connect((state, ownProps) => {
  return {
    helpIsOpen: state.rating.sidebar.helpIsOpen,
    genderStatIsOpen: state.rating.sidebar.genderStatIsOpen,
    specofferId: ownProps.location.query.specofferId,
  }
}, (dispath) => {
  return bindActionCreators({
    openHelperSidebar: toggleHelperSidebar(),
    closeHelperSidebar: toggleHelperSidebar(false),
    openGenderStatSidebar: toggleGenderStatSidebar(),
    closeGenderStatSidebar: toggleGenderStatSidebar(false),
  }, dispath)
})(Rating)