import DysisBackgroundTracking from './DysisBackgroundTracking';

import {globalConfig} from '../config';

export default class DysisBackground {

  protected dysisInstallationDate: number;
  protected dysisParticipantName: string;
  protected dysisParticipantAgreedToTerms: boolean = false;
  protected dysisParticipantSubmitted: boolean = false;

  constructor() {
    console.log('Dysis background script initiated ...')
    this.onInstall();
    this.updateOrSetDefaultValues();
    this.createListenerForLocalStorageChanges();
    if (this.dysisParticipantAgreedToTerms && this.dysisParticipantSubmitted) {
      this.initTrackers();
    }
    if (globalConfig.debug.displayLocalStorageChanges) {
      this.debugDisplayMutationRecords();
    }
  }

  updateOrSetDefaultValues() {
    chrome.storage.local.get(
      [
        'dysisInstallationDate',
        'dysisParticipantName',
        'dysisParticipantAgreedToTerms',
        'dysisParticipantSubmitted',
      ], (res) => {
      chrome.storage.local.set({
        dysisInstallationDate: 'dysisInstallationDate' in res ? res.dysisInstallationDate : '',
        dysisParticipantName: 'dysisParticipantName' in res ? res.dysisParticipantName : '',
        dysisParticipantAgreedToTerms: 'dysisParticipantAgreedToTerms' in res ? res.dysisParticipantAgreedToTerms : false,
        dysisParticipantSubmitted: 'dysisParticipantSubmitted' in res ? res.dysisParticipantSubmitted : false,
      });
    });
  }

  protected onInstall() {
    chrome.runtime.onInstalled.addListener(() => {
      console.log('Dysis extension successfully installed ...')
      chrome.storage.local.set({
        dysisInstallDate: Date.now(),
      });
    })
  }

  initTrackers() {
    new DysisBackgroundTracking(
      'reddit',
      'reddit.com'
    );
  }

  protected localStorageCallback(changes: chrome.storage.StorageChange, namespace: chrome.storage.AreaName, self: DysisBackground) {
    for (let [key] of Object.entries(changes)) {
      if (namespace === 'local' && key === 'dysisParticipantSubmitted') {
        self.updateOrSetDefaultValues()
        self.initTrackers();
      }
    }
  }
  
  protected createListenerForLocalStorageChanges() {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      this.localStorageCallback(changes, namespace, this)
    });
  }

  protected debugDisplayMutationRecords() {
    chrome.storage.onChanged.addListener(function (changes, namespace) {
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
          `Storage key "${key}" in namespace "${namespace}" changed.`,
          `Old value was "${oldValue}", new value is "${newValue}".`
        );

      }
    });
  }
}