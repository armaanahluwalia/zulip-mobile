/* @flow */
import deepFreeze from 'deep-freeze';

import { NULL_OBJECT } from '../../nullObjects';
import draftImagesReducers from '../draftImagesReducers';
import {
  DRAFT_IMAGE_ADD,
  DRAFT_IMAGE_REMOVE,
  DRAFT_IMAGE_UPLOADING,
  DRAFT_IMAGE_UPLOADED,
  DRAFT_IMAGE_ERROR,
} from '../../actionConstants';

describe('draftImagesReducers', () => {
  describe(DRAFT_IMAGE_ADD, () => {
    test('add a new draft image', () => {
      const initialState = NULL_OBJECT;
      const action = deepFreeze({
        type: DRAFT_IMAGE_ADD,
        id: '12345',
        fileName: 'testFileName',
        uri: 'path/to/file',
      });
      const expectedState = {
        '12345': {
          fileName: 'testFileName',
          uri: 'path/to/file',
        },
      };
      const actualState = draftImagesReducers(initialState, action);
      expect(actualState).toEqual(expectedState);
    });
  });
  describe(DRAFT_IMAGE_REMOVE, () => {
    test('add a new draft image', () => {
      const initialState = {
        '45678': {
          fileName: 'testFileName',
          uri: 'path/to/file',
        },
        '12345': {
          fileName: 'testFileName',
          uri: 'path/to/file',
        },
      };
      const action = deepFreeze({
        type: DRAFT_IMAGE_REMOVE,
        id: '12345',
      });
      const expectedState = {
        '45678': {
          fileName: 'testFileName',
          uri: 'path/to/file',
        },
      };
      const actualState = draftImagesReducers(initialState, action);
      expect(actualState).toEqual(expectedState);
    });
  });
  describe(DRAFT_IMAGE_UPLOADING, () => {
    test('add uploading state to draft image', () => {
      const initialState = {
        '45678': {
          fileName: 'testFileName',
          uri: 'path/to/file',
        },
        '12345': {
          fileName: 'testFileName',
          uri: 'path/to/file',
        },
      };
      const action = deepFreeze({
        type: DRAFT_IMAGE_UPLOADING,
        id: '12345',
      });
      const expectedState = {
        '45678': {
          fileName: 'testFileName',
          uri: 'path/to/file',
        },
        '12345': {
          fileName: 'testFileName',
          uri: 'path/to/file',
          uploading: true,
          error: false,
          uploaded: false,
        },
      };
      const actualState = draftImagesReducers(initialState, action);
      expect(actualState).toEqual(expectedState);
    });
  });
  describe(DRAFT_IMAGE_UPLOADED, () => {
    test('add uploading state to draft image', () => {
      const initialState = {
        '45678': {
          fileName: 'testFileName',
          uri: 'path/to/file',
        },
        '12345': {
          fileName: 'testFileName',
          uri: 'path/to/file',
          uploading: true,
          uploaded: false,
          error: false,
        },
      };
      const action = deepFreeze({
        type: DRAFT_IMAGE_UPLOADED,
        id: '12345',
      });
      const expectedState = {
        '45678': {
          fileName: 'testFileName',
          uri: 'path/to/file',
        },
        '12345': {
          fileName: 'testFileName',
          uri: 'path/to/file',
          uploading: false,
          error: false,
          uploaded: true,
        },
      };
      const actualState = draftImagesReducers(initialState, action);
      expect(actualState).toEqual(expectedState);
    });
  });
  describe(DRAFT_IMAGE_ERROR, () => {
    test('add error state to draft image', () => {
      const initialState = {
        '45678': {
          fileName: 'testFileName',
          uri: 'path/to/file',
        },
        '12345': {
          fileName: 'testFileName',
          uri: 'path/to/file',
          uploading: true,
          uploaded: false,
          error: false,
        },
      };
      const action = deepFreeze({
        type: DRAFT_IMAGE_ERROR,
        id: '12345',
      });
      const expectedState = {
        '45678': {
          fileName: 'testFileName',
          uri: 'path/to/file',
        },
        '12345': {
          fileName: 'testFileName',
          uri: 'path/to/file',
          uploading: false,
          error: true,
          uploaded: false,
        },
      };
      const actualState = draftImagesReducers(initialState, action);
      expect(actualState).toEqual(expectedState);
    });
  });
});
