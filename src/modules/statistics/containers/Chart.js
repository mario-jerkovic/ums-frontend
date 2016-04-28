import React, { Component, PropTypes } from 'react';
import 'amcharts3';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/pie';
import 'amcharts3/amcharts/themes/light';
import 'ammap3';
import 'ammap3/ammap/themes/light.js';
import { connect } from 'react-redux';
import ukraineLow from './../components/UkraineMap';
import { STATISTICS_MAP as map } from './../constants';
import { loadStatistics } from '../actions';
import { fillMapWithData } from '../helpers';
import ChartDataTable from '../components/ChartDataTable'
import Loader from 'loader'
import isFunction from 'lodash/fp/isFunction'

class Chart extends Component {

  componentDidMount() {
    let { chartId, requestParams} = this.props;
    this.props.getChartData(chartId, requestParams);
  }

  componentWillUnmount() {
    AmCharts.clear();
  }
  /**
   * when component is updated (rendered) - paste an amChart
   */
  componentDidUpdate(prevProps, prevState) {
    let { dataProvider } = this.props;
    if (dataProvider && dataProvider.data && !dataProvider.isLoading) {
      this._renderChart();
    }
  }
  /**
   * if chart changed - delete previous and request data for a next one.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.chartId !== this.props.chartId) {
      AmCharts.clear();
      this.props.getChartData(nextProps.chartId);
    }
  }
  /**
   * merge amChart configs with data from a server (dataProvider)
   * amChartConfig - predefined configs (from constants) for amChart
   */
  _renderChart() {
    let { dataProvider: {data}, chartId } = this.props;
    let { amChartConfig, processData }  = this.props.config;
    if (processData) {
      data = processData(data)
    }
    if (amChartConfig.type === 'map') {
      AmCharts.maps.ukraineLow = ukraineLow;
      amChartConfig.listeners[0].method = fillMapWithData(data);
      AmCharts.makeChart(chartId, amChartConfig);
      return;
    }
    amChartConfig.dataProvider = data;
    AmCharts.makeChart(chartId, amChartConfig);
  }

  render() {
    let { dataProvider, chartId, config: { headers } } = this.props;
    return (
      <div className="statistics__content">
        <Loader isLoading={!dataProvider || dataProvider.isLoading}/>
        <div id={chartId} className="statistics__amchart"></div>
        {/* if data for chart is available - so render a table with it*/}
        { dataProvider.data.length ? 
            <ChartDataTable chartData={dataProvider.data} headers={headers}/> : null }
      </div>
    );
  }
}

Chart.propTypes = {
  dispatch: PropTypes.func,
  config: PropTypes.object.isRequired,
  chartId: PropTypes.string.isRequired,
  dataProvider: PropTypes.object.isRequired,
  specofferId: PropTypes.string
};
/**
 *
 * @returns dataProvider - data for chart
 * @returns config - config fot this component
 * @returns chartId - id form route parameters
 **/
const mapStateToChartFactory = (state, ownProps) => {
  let { chartId } =  ownProps.params;
  let collectionName = map[chartId].callApi.collectionName || chartId;
  return {
    dataProvider: state.statistics[collectionName],
    config: map[chartId],
    chartId: chartId
  };
};

const mapDispatchToChartFactory = (dispatch) => {
  return {
    getChartData: (chartId, requestParams) => {
      // get collection name for case then there are two chart depends on one API
      let collectionName = map[chartId].callApi.collectionName || chartId;
      let { url } = map[chartId].callApi;
      if (isFunction(url)) {
        url = url(requestParams)
      }
      dispatch(loadStatistics(url, collectionName))
    }
  };
};

export default connect(
  mapStateToChartFactory, mapDispatchToChartFactory
)(Chart);