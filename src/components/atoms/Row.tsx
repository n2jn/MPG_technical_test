import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

interface RowProps extends ViewProps {}

export const Row: React.FC<RowProps> = ({children, style}) => {
  if (!children) {
    return <></>;
  }
  const childrenWithRowWrapper = React.Children.map(children, (child, id) => (
    <View key={id} style={styles.columns}>
      {child}
    </View>
  ));
  return (
    <View style={[styles.rowContainer, style]}>{childrenWithRowWrapper}</View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
  },

  columns: {
    flex: 1,
    justifyContent: 'center',
  },
});
