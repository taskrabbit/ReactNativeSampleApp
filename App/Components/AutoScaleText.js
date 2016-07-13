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
    maxHeight: React.PropTypes.number.isRequired,
    color: React.PropTypes.string,
    style: React.PropTypes.oneOfType([
      Text.propTypes.style,
      React.PropTypes.shape({
        width: React.PropTypes.number,
      }),
    ]).isRequired,
  };

  static defaultProps = {
    color: 'black',
  };

  constructor(props) {
    super(props);

    this.state = {
      fontSize: props.maxFontSize,
      finished: false,
    };
  }

  determineFontSize = () => {
    UIManager.measure(ReactNative.findNodeHandle(this.refs.textView), (x, y, w, h, px, py) => {
      if (h > this.props.maxHeight) {
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

  render() {
    return (
      <Text
        ref='textView'
        onLayout={this.determineFontSize}
        {...this.props}
        style={[
          this.props.style,
          {
            fontSize: this.state.fontSize,
            color: this.state.finished ? this.props.color : 'transparent',
          },
        ]}
      >
        {this.props.children}
      </Text>
    );
  }
}

export default AutoScaleText;
