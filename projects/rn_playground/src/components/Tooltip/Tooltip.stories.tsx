import React from 'react';

import { storiesOf } from '@storybook/react-native';

import CenterView from '../CenterView';
import { Button, StyleSheet, Text, View } from 'react-native';
import useTooltip from './useTooltip';

const styles = StyleSheet.create({
  button: {
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  container: {
    backgroundColor: 'lightgray',
    padding: 8,
  },
  tooltipText: {
    color: '#fff',
  },
});

storiesOf('Components/Tooltip', module).add('Default', () => {
  function Default() {
    const { toggleTooltip, tooltip, triggerProps } = useTooltip(
      <Text style={styles.tooltipText}>Hello world!</Text>,
    );

    return (
      <CenterView>
        <View style={styles.container}>
          <View {...triggerProps} style={styles.button}>
            <Button onPress={toggleTooltip} title="Toggle tooltip" />
          </View>
          {tooltip}
        </View>
      </CenterView>
    );
  }

  return <Default />;
});
