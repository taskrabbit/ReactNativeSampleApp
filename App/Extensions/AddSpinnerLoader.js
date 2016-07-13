import React from "react";

import * as Extension from '../Extensions/Extension';

import SpinnerLoader  from '../Components/SpinnerLoader';

var AddSpinnerLoader = {
  extensionName: 'AddSpinnerLoader',

  optionalParams: {
    spinnerContainerStyles: 'styles for the spinner loader',
  },

  exports: {
    methods: ['start', 'stop']
  },

  getInitialState() {
    return {
      spinning: false,
    }
  },

  start() {
    this.setState({spinning: true})
  },

  stop() {
    this.setState({spinning: false})
  },

  renderExtension() {
    return (
      <SpinnerLoader
        spinning={this.state.spinning}
        spinnerContainerStyles={this.params.spinnerContainerStyles}
      >
        {this.renderComponent()}
      </SpinnerLoader>
    )
  }
};

export default Extension.create(AddSpinnerLoader);
