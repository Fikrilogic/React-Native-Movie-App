
import {Input, Icon} from '@ui-kitten/components';
import React from 'react';
import {TouchableWithoutFeedback, ViewStyle} from 'react-native';

type InputSearchProps = {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  endIcon?: React.ReactNode
  style?: ViewStyle
  placeholder?: string
  size?: string
};

const InputSearch = (props: InputSearchProps) => {
  const EndButtonInput = (): React.ReactElement => (
    <TouchableWithoutFeedback onPress={props.onSubmit}>
      {props.endIcon ?? <Icon
        name={'eye-off'}
      />}
    </TouchableWithoutFeedback>
  );
  console.log(`is null ${props.endIcon === undefined}`)
  return (
    <Input
      value={props.value}
      onChangeText={props.onChange}
    //   accessoryRight={EndButtonInput}
      accessoryRight={props.endIcon ? EndButtonInput : undefined}
      style={props.style}
      placeholder={props.placeholder}
      size={props.size}
    />
  );
};

export default InputSearch;
