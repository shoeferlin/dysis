import DysisBackgroundTracking from './DysisBackgroundTracking';

export default class DysisBackground {

  protected dysisInstallationDate: number;
  protected dysisParticipantName: string;
  protected dysisParticipantAgreedToTerms: boolean = false;
  protected dysisParticipantSubmitted: boolean = false;

  constructor() {
    console.log('Dysis background script initiated ...')
    this.setDefaultValues();
    this.onInstall();
    // if (this.dysisParticipantAgreedToTerms && this.dysisParticipantSubmitted) {
      this.initTrackers();
    // }
  }

  protected setDefaultValues() {
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
      console.log('Dysis extension installed ...')
      chrome.storage.local.set({
        dysisInstallDate: Date.now(),
      });
    })
  }

  protected initTrackers() {
    new DysisBackgroundTracking(
      'reddit',
      'reddit.com'
    );
  }
  
}