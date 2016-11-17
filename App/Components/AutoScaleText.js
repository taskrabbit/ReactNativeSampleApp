import React from 'react';

import ReactNative, {
  NativeModules,
} from 'react-native';

const UIManager = NativeModules.UIManager;

import Text from './Text';

class AutoScaleText extends React.Component {
  static propTypes = {
    ...Text.propTypes,
    maxFontSize: React.PropTypes.number.isRequired,
    //maxHeight: React.PropTypes.number.isRequired,
    color: React.PropTypes.string,
    //style: React.PropTypes.oneOfType([
    //  React.PropTypes.number,
    //  React.PropTypes.shape({
    //    width: React.PropTypes.number,
    //  }),
    //]),
  };

  static defaultProps = {
    color: 'black',
  };

  constructor(props) {
    super(props);

    this.state = {
      fontSize: props.maxFontSize,
      finished: null,
    };

    this.visible = true
  }

  determineFontSize = () => {
    UIManager.measure(ReactNative.findNodeHandle(this.refs.textView), (x, y, w, h, px, py) => {
      if (!this.visible) return;

      var tooBig = this.props.maxHeight && h > this.props.maxHeight;
      if (!tooBig) {
        tooBig = this.props.maxWidth && w > this.props.maxWidth;
      }
      if (tooBig) {
        this.setState({
          fontSize: this.state.fontSize - 0.5,
        });
        this.determineFontSize();
      }
      else {
        this.setState({finished: true});
      }
    });
  };

  componentWillUnmount() {
    this.visible = false;
  }

  render() {
    return (
      <Text
        ref='textView'
        //onLayout={this.determineFontSize}
        allowFontScaling={false}
        {...this.props}
        style={[
          this.props.style,
          {
            fontSize: this.state.fontSize,
            //color: this.state.finished ? this.props.color || 'black' : 'transparent',
          },
        ]}
      >
        {this.props.children}
      </Text>
    );
  }
}

export default AutoScaleText;
