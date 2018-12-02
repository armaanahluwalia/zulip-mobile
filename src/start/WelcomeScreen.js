/* @flow */
import { connect } from 'react-redux';

import React, { PureComponent } from 'react';

import type { Dispatch } from '../types';
import { Screen, ViewPlaceholder, ZulipButton } from '../common';
import { navigateToAddNewAccount, navigateToWelcomeHelp } from '../actions';

type Props = {
  dispatch: Dispatch,
};

class WelcomeScreen extends PureComponent<Props> {
  props: Props;

  render() {
    const { dispatch } = this.props;
    return (
      <Screen title="Welcome!" centerContent padding>
        <ZulipButton
          text="I have a Loop Zero account"
          onPress={() => {
            dispatch(navigateToAddNewAccount(''));
          }}
        />
        <ViewPlaceholder height={20} />
        <ZulipButton
          text="I am new to Loop Zero"
          onPress={() => {
            dispatch(navigateToWelcomeHelp());
          }}
        />
      </Screen>
    );
  }
}

export default connect()(WelcomeScreen);
