/* @flow */
import React, { PureComponent } from 'react';
import { View } from 'react-native';
// $FlowFixMe
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';

import type { Context, Dispatch, Narrow } from '../types';
import { showErrorAlert } from '../utils/info';
import { IconPlus, IconLeft, IconPeople, IconImage, IconCamera } from '../common/Icons';
import AnimatedComponent from '../animation/AnimatedComponent';
import { navigateToCreateGroup } from '../actions';
import { getNarrowToSendTo } from '../selectors';

type Props = {
  dispatch: Dispatch,
  expanded: boolean,
  narrow: Narrow,
  onExpandContract: () => void,
  onImageSelect: Object => void,
  disableUpload?: boolean,
  disableCamera?: boolean,
  maxFiles?: number,
};

/*
* Extract the image name from its uri in case the fileName is empty.
*/
export const getDefaultFilenameFromUri = (uri: string, fileName?: string) =>
  uri.replace(/^.*[\\/]/, '');

/**
 * Adjust `fileName` to one with the right extension for the file format.
 *
 * Sometimes we get an image whose filename reflects one format (what it's
 * stored as in the camera roll), but the actual image has been converted
 * already to another format for interoperability.
 *
 * The Zulip server will infer the file format from the filename's
 * extension, so in this case we need to adjust the extension to match the
 * actual format.  The clue we get in the image picker response is the
 * extension found in `uri`.
 */
export const chooseUploadImageFilename = (uri: string, fileName?: string): string => {
  if (typeof fileName !== 'string' || fileName === '') {
    fileName = getDefaultFilenameFromUri(uri, fileName);
  }
  /*
  * Photos in an iPhone's camera roll (taken since iOS 11) are typically in
  * HEIF format and have filenames with the extension `.HEIC`.  When the user
  * selects one of these photos through the image picker, the file gets
  * automatically converted to JPEG format... but the `fileName` property in
  * the react-native-image-crop-picker response **MAY** still have the `.HEIC`
  * extension. This is untested across physical ios devices but needs to
  * be confirmed.
  */
  if (/\.jpe?g$/i.test(uri)) {
    return fileName.replace(/\.heic$/i, '.jpeg');
  }
  return fileName;
};

class ComposeMenu extends PureComponent<Props> {
  context: Context;
  props: Props;

  static contextTypes = {
    styles: () => null,
  };

  handleImageRequest = async (requestType: 'openPicker' | 'openCamera') => {
    const { dispatch, narrow, onImageSelect, maxFiles } = this.props;
    const defaults = {
      mediaType: 'photo',
      compressImageMaxWidth: 2000,
      compressImageMaxHeight: 2000,
      forceJpg: true,
      compressImageQuality: 0.7,
    };
    try {
      let requestObj = {
        ...defaults,
      };

      if (requestType === 'openPicker') {
        requestObj = {
          ...defaults,
          multiple: true,
          maxFiles,
        };
      }
      let images = await ImagePicker[requestType](requestObj);
      images = requestType === 'openPicker' ? images : [images];
      const response = {
        images: images.map(image => {
          const inferredFileName = chooseUploadImageFilename(image.path, image.filename);
          return {
            uri: image.path,
            fileName: inferredFileName,
          };
        }),
      };
      onImageSelect({
        narrow,
        response,
        dispatch,
      });
    } catch (e) {
      if (e.code === 'E_PICKER_CANCELLED') {
        return;
      }
      showErrorAlert(e.toString(), 'Error');
    }
  };
  handleImageUpload = () => {
    this.handleImageRequest('openPicker');
  };

  handleCameraCapture = () => {
    this.handleImageRequest('openCamera');
  };

  render() {
    const { styles } = this.context;
    const { dispatch, expanded, onExpandContract, disableUpload, disableCamera } = this.props;
    let animatedWidth = 40;
    if (!disableCamera) {
      animatedWidth += 40;
    }
    if (!disableUpload) {
      animatedWidth += 40;
    }
    return (
      <View style={styles.composeMenu}>
        <AnimatedComponent
          property="width"
          useNativeDriver={false}
          visible={expanded}
          width={animatedWidth}
        >
          <View style={styles.composeMenu}>
            <IconPeople
              style={styles.composeMenuButton}
              size={24}
              onPress={() => dispatch(navigateToCreateGroup())}
            />
            {!disableUpload && (
              <IconImage
                style={styles.composeMenuButton}
                size={24}
                onPress={this.handleImageUpload}
              />
            )}
            {!disableCamera && (
              <IconCamera
                style={styles.composeMenuButton}
                size={24}
                onPress={this.handleCameraCapture}
              />
            )}
          </View>
        </AnimatedComponent>
        {!expanded && <IconPlus style={styles.expandButton} size={24} onPress={onExpandContract} />}
        {expanded && <IconLeft style={styles.expandButton} size={24} onPress={onExpandContract} />}
      </View>
    );
  }
}

export default connect((state, props) => ({
  narrow: getNarrowToSendTo(props.narrow)(state),
}))(ComposeMenu);
