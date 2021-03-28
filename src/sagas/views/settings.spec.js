import { all, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { pageReady } from 'sagas/actions/settings';

import settingsPageSaga, {
  initSettingsPageWorker,
  updateConnectionWatcher,
  updateDetailsWatcher,
  updateEmailWatcher,
} from './settings';

describe('Init page /settings logic tests', () => {
  let globGen;
  beforeAll(() => {
    globGen = cloneableGenerator(initSettingsPageWorker)();
    globGen.next(); // request all connections
    globGen.next(); // race
  });

  it('initSettingsPageWorker success response from connections request', () => {
    const gen = globGen.clone();
    const result = gen.next({ success: {} }).value;
    expect(result).toEqual(put(pageReady()));
  });

  it('initSettingsPageWorker error response from connections request', () => {
    const gen = globGen.clone();
    const result = gen.next({ error: {} }).done;
    expect(result).toEqual(true);
  });
});

describe('settings generators tests', () => {
  it('should call all watchers and init.', () => {
    const gen = cloneableGenerator(settingsPageSaga)();
    const result = gen.next().value;
    expect(result).toEqual(
      all([initSettingsPageWorker(), updateConnectionWatcher(), updateDetailsWatcher(), updateEmailWatcher()])
    );
  });
});
