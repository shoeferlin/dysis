import { dysisConfig } from "../DysisConfig";
import { DysisRequest } from "../DysisRequest";

export default class DysisBackgroundSync {

  participantID: string;
  reddit_user_name: string;

  SYNC_INTERVAL_IN_MINUTES: number = dysisConfig.sync.defaultSyncIntervalInMinutes;

  constructor(participantID: string) {
    this.participantID = participantID;
    this.init();
  }

  init() {
    this.createSyncInterval();
    this.listenForSyncInteval();
  }

  private createSyncInterval() {
    // Create interval for background script
    // Caution: Be aware that Chrome does not reliably tolerate alarms firing more frequently
    // then once a minute (so the minimum is 60 seconds for tracking), one exception is
    // in unpacked chrome extension, therre Chrome allows more frequent alarms (see the following 
    // link: https://developer.chrome.com/docs/extensions/reference/alarms/#method-create)
    chrome.alarms.create(
      'dysisBackgroundSync', 
      { periodInMinutes: this.SYNC_INTERVAL_IN_MINUTES }
    );
  }

  private listenForSyncInteval() {
    chrome.alarms.onAlarm.addListener((alarm) => {
      if (alarm.name == 'dysisBackgroundSync') {
        chrome.storage.local.get(
          [
            'dysisUsageTime'
          ], (res) => {
            const usageTime: number = 'dysisUsageTime' in res ? res.dysisUsageTime : 0;
            this.syncUsageTime(usageTime);
            if (usageTime > 0) {
              chrome.storage.local.get(
                ['reddit_user_name'], (res) => {

                  const user_name: string = 'reddit_user_name' in res ? res.reddit_user_name : "brrrrrrrrrrrr";
                  this.syncUserTimestamp(user_name);
                }
              )
            }
          }
        );
        console.log('Dysis syncing ...')
      }
    })
  }

  private async syncUsageTime(usageTime: number) {
    const response = await DysisRequest.post(
      'tracking/update/dysis',
      {
        'participantID': this.participantID,
        'totalUsageTime': usageTime,
      }
    )
    if (!response) {
      console.log('Dysis sync error ...')
    }
  }

  private async syncUserTimestamp(user_name: string) {
    console.log('syncUserTimestamp? ');
    const response = await DysisRequest.post(
      'api/user/update_timestamp',
      {
        'identifier': user_name,
      }
    )
    if (!response) {
      console.log('Dysis sync error ...')
    }
  }
}
