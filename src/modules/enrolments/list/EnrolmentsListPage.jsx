import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { createSelector } from 'reselect';
import {Table, Column, Cell} from 'fixed-data-table';
import {push} from 'react-router-redux';

import * as dictConst from '../../dictionaries/constants';
import {loadEnrolments, setFieldWidthEnrolments} from './../actions';
import loadDictionaries from '../../dictionaries/actions';
import {isDataForEnrolmentLoaded, decodeEnrolments, getEnrolmentIdByIndex} from '../helpers';
import {setTableDimensions} from '../../commons/tableHelpers';

import Loader from 'loader'

let buildCells = (decodedEnrolments, enrolmentsFieldNames) => {
  return Object.keys(enrolmentsFieldNames).map((field) => {
    return <Column
      columnKey={field}
      header={<Cell>{enrolmentsFieldNames[field].name}</Cell>}
      cell={props => (
            <Cell {...props}>
              {decodedEnrolments[props.rowIndex][field]}
            </Cell>
            )
          }
      isResizable
      width={enrolmentsFieldNames[field].width}
    />
  });
};

class EnrolmentsListPage extends Component {
  constructor(props) {
    super(props);
  }

  _onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    this.props.setFieldWidthEnrolments(newColumnWidth, columnKey);
  }

  _onClickRow = (e, index) => {
    let id = getEnrolmentIdByIndex(index);
    this.props.goToDetailed(id);
  }

  componentDidMount() {
    const {limit, offset} = this.props.enrolmentList;
    this.props.loadDictionaries([dictConst.DEPARTMENTS, dictConst.ENROLMENTS_TYPES, dictConst.ENROLMENTS_STATUS_TYPES]);
    this.props.loadEnrolments({limit, offset});
  }

  render() {
    let {decodedEnrolments, enrolmentsFieldNames} = this.props;

    return (
      <Loader isLoading={!isDataForEnrolmentLoaded()} isPageLoader>
        <Table
          rowsCount={decodedEnrolments.length}
          rowHeight={50}
          headerHeight={70}
          onColumnResizeEndCallback={this._onColumnResizeEndCallback}
          isColumnResizing={false}
          onRowClick={this._onClickRow}
          {...setTableDimensions({width: 1050})}
        >
          {buildCells(decodedEnrolments, enrolmentsFieldNames)}
        </Table>
      </Loader>
    );
  }
}

export const getDecodedEnrolments = createSelector(
  [ (state) => state.enrolments.list,
   (state) => state.dictionaries,
   (state) => state.enrolments.list.enrolmentsFieldNames],
  (enrolmentList, listOfDict, enrolmentsFieldNames) => ({
    decodedEnrolments: decodeEnrolments(enrolmentList, listOfDict),
    enrolmentList: enrolmentList,
    enrolmentsFieldNames: enrolmentsFieldNames
  })
);

const mapDispatchToEnrolments = (dispatch) => (
  { loadEnrolments: (params) => dispatch(loadEnrolments(params)),
    loadDictionaries: (dicArray) => dispatch(loadDictionaries(dicArray)),
    setFieldWidthEnrolments: (newWidth, columnKey) => dispatch(setFieldWidthEnrolments(newWidth, columnKey)),
    goToDetailed: (id) => dispatch(push(`/enrolments/${id}/info`))
  }
);

export default connect(
  getDecodedEnrolments,
  mapDispatchToEnrolments
)(EnrolmentsListPage);