import React from 'react';

import {
  ListView,
  RefreshControl,
} from 'react-native';

import isPromise from 'is-promise';

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

class RefreshableListView extends React.Component {

  static propTypes = {
    loadData: React.PropTypes.func.isRequired,
    minDisplayTime: React.PropTypes.number,
    minBetweenTime: React.PropTypes.number,
    androidRefreshable: React.PropTypes.bool,
  };

  static defaultProps = {
    loadData: (() => {}),
    minDisplayTime: 300,
    minBetweenTime: 300,
    androidRefreshable: true,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  handleRefresh = () => {
    if (this.willRefresh) return;

    this.willRefresh = true;

    var loadingDataPromise = new Promise((resolve) => {
      var loadDataReturnValue = this.props.loadData(resolve);

      if (isPromise(loadDataReturnValue)) {
        loadingDataPromise = loadDataReturnValue;
      }

      Promise.all([
        loadingDataPromise,
        new Promise((resolve) => this.setState({isRefreshing: true}, resolve)),
        delay(this.props.minDisplayTime),
      ])
        .then(() => delay(this.props.minBetweenTime))
        .then(() => {
          this.willRefresh = false;
          this.setState({isRefreshing: false});
        });
    });
  };

  render() {
    const listViewProps = {
      dataSource: this.props.dataSource,
      renderRow: this.props.renderRow,
      renderFooter: this.props.renderFooter,
      style: [this.props.style, {flex: 1}],
      renderScrollComponent: this.props.renderScrollComponent,
      renderHeader: this.props.renderHeaderWrapper,
    };

    const pullToRefreshProps = {
      style: [this.props.pullToRefreshStyle, {flex: 1}],
      refreshing: this.state.isRefreshing || false,
      onRefresh: this.handleRefresh,
      enabled: this.props.androidRefreshable,
    };

    return (
      <RefreshControl {...pullToRefreshProps}>
        <ListView {...listViewProps} />
      </RefreshControl>
    );
  }
}

export default RefreshableListView;
