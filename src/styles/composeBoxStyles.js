/* @flow */
import { Platform } from 'react-native';

import type { Style } from '../types';
import { BRAND_COLOR } from './';

export type ComposeBoxStyles = {
  composeWrapper: Style,
  composeBox: Style,
  composeImage: Style,
  composeImages: Style,
  composeImageDeleteButton: Style,
  composeImageContainer: Style,
  composeImageUploading: Style,
  composeImageUploadIcon: Style,
  composeText: Style,
  composeTextInput: Style,
  topicInput: Style,
  composeSendButton: Style,
  composeMenu: Style,
  expandButton: Style,
  composeMenuButton: Style,
  disabledComposeBox: Style,
  disabledComposeButton: Style,
  disabledComposeText: Style,
};

type Props = {
  color: string,
  backgroundColor: string,
  borderColor: string,
};

const inputMarginPadding = {
  paddingHorizontal: 8,
  ...Platform.select({
    ios: {
      paddingVertical: 8,
    },
    android: {
      paddingVertical: 2,
    },
  }),
};

export default ({ color, backgroundColor, borderColor }: Props) => ({
  composeWrapper: {
    flexShrink: 1,
  },
  composeBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(127, 127, 127, 0.1)',
    flexShrink: 1,
  },
  composeText: {
    flexGrow: 1,
    flexShrink: 1,
    paddingVertical: 8,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  composeImage: {
    flex: 1,
  },
  composeImageUploading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  composeImageUploadIcon: {
    textShadowColor: 'rgba(0, 0, 0, 0.50)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    fontSize: 24,
    color: 'white',
  },
  composeImageDeleteButton: {
    position: 'absolute',
    top: 3,
    right: 3,
    zIndex: 1,
  },
  composeImageContainer: {
    flexGrow: 1,
    flexShrink: 1,
    minHeight: 70,
    margin: 5,
  },
  composeTextInput: {
    flexGrow: 0,
    flexShrink: 1,
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor,
    color,
    fontSize: 15,
    ...inputMarginPadding,
  },
  topicInput: {
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor,
    marginBottom: 8,
    ...inputMarginPadding,
  },
  composeSendButton: {
    margin: 8,
  },
  composeMenu: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  expandButton: {
    padding: 12,
    color: BRAND_COLOR,
  },
  composeMenuButton: {
    padding: 12,
    marginRight: -8,
    color: BRAND_COLOR,
  },
  disabledComposeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'gray',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  disabledComposeButton: {
    padding: 12,
  },
  disabledComposeText: {
    flex: 1,
    color: 'white',
  },
});
