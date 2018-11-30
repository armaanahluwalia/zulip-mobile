/* @flow */
import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import { Screen, RawLabel } from '../common';

const styles = StyleSheet.create({
  helpText: {
    fontSize: 20,
  },
});

export default class WelcomeHelpScreen extends PureComponent<{}> {
  render() {
    return (
      <Screen title="Help" centerContent padding>
        <RawLabel
          style={styles.helpText}
          text={`Welcome to Loop Zero!

This is an invite only community. You'll need to complete the registration process from your email invite.

Alternatively you can email armaan@loopzero.in to request an invitation.

Hope to see you back here soon!
`}
        />
      </Screen>
    );
  }
}
