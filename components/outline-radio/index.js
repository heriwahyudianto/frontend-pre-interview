import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

class OutlineRadio extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const unCheck = <Icon
      name="radio-button-unchecked"
      type="MaterialIcons"
      style={{ fontSize: 20 }}
      onPress={this.props.onPress}
    />;
    const check = <Icon
      name="radio-button-checked"
      type="MaterialIcons"
      style={{ fontSize: 20, color: 'blue' }}
      onPress={this.props.onPress}
    />;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <View>
          {(this.props.checked)
            ? check
            : unCheck }
        </View>
        <View style={{ paddingLeft: 10 }}>
          <Text onPress={this.props.onPress} >{this.props.label}</Text>
        </View>
      </View>
    );
  }
}

OutlineRadio.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onPress: PropTypes.func,
};

OutlineRadio.defaultProps = {
  label: '',
  checked: false,
  onPress: () => {},
};

export default OutlineRadio;
