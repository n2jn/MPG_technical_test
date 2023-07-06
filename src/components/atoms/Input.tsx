import React, {useRef} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {Sizing} from '~helper/sizing';
import useThemedStyled from '~hooks/useThemeStyled';
import {ColorTokens, Theme} from '~theme/model/theme.interface';

const Input = ({style, ...textInputProps}: TextInputProps) => {
  const textInputRef = useRef<TextInput>(null);
  const styles = useThemedStyled(searchBarstyles);
  return (
    <View style={[styles.container, style]}>
      <TextInput
        ref={textInputRef}
        style={styles.textInput}
        {...textInputProps}
      />
    </View>
  );
};

export default Input;

const searchBarstyles = (theme: Theme, colors: ColorTokens) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    textInput: {
      flexGrow: 1,
      borderColor: colors.primary[500],
      backgroundColor: theme.palette.neutral.light,
      padding: Sizing.x10,
      borderWidth: 1,
      borderRadius: 10,
    },
  });
