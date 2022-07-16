import {dysisConfig} from '../DysisConfig';

import {DysisRequest} from '../DysisRequest';

export default class DysisBackgroundTracking {

  protected trackingSiteName: string; 
  protected trackingSiteUrl: string;
  protected trackingIntervalInSeconds: number;
  protected syncIntervalInSeconds: number;

  protected backgroundAlarmVariableName: string;
  protected usageTimeVariableName: string;

  protected browserActivityState: string = 'active'

  protected participantID: string;

  constructor(
    // Constructor parameters
    trackingSiteName: string,
    trackingSiteUrl: string,
    participantName: string,
    trackingIntervalInSeconds: number = 1,
    syncIntervalInSeconds: number = 10,
  ) {
    // Set variables
    this.trackingSiteName = trackingSiteName;
    this.trackingSiteUrl = trackingSiteUrl;
    this.trackingIntervalInSeconds = trackingIntervalInSeconds;
    this.syncIntervalInSeconds = syncIntervalInSeconds;
    this.participantID = participantName;
    // Set derived variables
    this.backgroundAlarmVariableName = `${this.trackingSiteName}Tracking`;
    this.usageTimeVariableName = `${this.trackingSiteName}UsageTimeTotal`
    // Initialize
    this.init()
  }

  protected init() {
    this.setDefaultLocalStorageValues();
    this.createBrowserActivityStateDetector();
    this.createExtensionBackgroundAlarm();
    this.createExtensionBackgroundOnAlarm();
  }

  protected setDefaultLocalStorageValues() {
    // Setting default values in local storage (to make sure they are there and set to a default)
    chrome.storage.local.get(
      [
        this.usageTimeVariableName,
      ], (res) => {
      chrome.storage.local.set({
        [this.usageTimeVariableName]: this.usageTimeVariableName in res ? res[this.usageTimeVariableName] : 0,
      });
    });
  }

  protected createBrowserActivityStateDetector() {
    // Adds an event listener which will fire and set the browser activity state every time a
    // a state change is detected
    chrome.idle.onStateChanged.addListener(
      (browserActivityState) => {
        console.log(`State change to '${this.browserActivityState}' detected`);
        this.browserActivityState = browserActivityState;
      }
    )
  }

  protected createExtensionBackgroundAlarm() {
    // Create interval for background script
    chrome.alarms.create(this.backgroundAlarmVariableName, {
      periodInMinutes: this.trackingIntervalInSeconds / 60
    });
  }

  protected createExtensionBackgroundOnAlarm() {
    // Creates an event listener listening to all alarms firing in Chrome
    chrome.alarms.onAlarm.addListener((alarm) => {
      // If the firing event listener is the one of this instance execute the subsequent code
      if (alarm.name == this.backgroundAlarmVariableName) {
        // Retrieve the total and increment usage time from the extension's local storage
        chrome.storage.local.get(
          [
            this.usageTimeVariableName,
          ], (res) => {
            // Create local variables from the retrieved local storage
            let usageTime: number = res[this.usageTimeVariableName];
            // Asyncly get the active tab
            this.isCurrentActiveTab().then((isCurrentActiveTab) => {
              // Usage times should only increase if the following conditions for a 'tick' are met:
              // 1) The current active tab matches the url of this instance
              // 2) The browser state is as active (can also be idle or locked)
              if (isCurrentActiveTab && this.browserActivityState === 'active') {
                // Increase the usage times by one 'tick'
                usageTime = usageTime + this.trackingIntervalInSeconds;
                // Log a tick to the console if set in globalConfig
                if (dysisConfig.debug.displayUsageTimeTicks) {
                  console.log(`Tick for ${this.trackingSiteName} (Total usage time: ${usageTime} s)`)
                }
                // Set the new increased usage times
                chrome.storage.local.set({
                  [this.usageTimeVariableName]: usageTime,
              });
            }
          });
          // Sync according according to the given sync interval
          if (usageTime !== 0 && usageTime % this.syncIntervalInSeconds === 0) {
            // The code that will be executed to sync the time
            this.syncUsageTime(usageTime);
            if (dysisConfig.debug.displaySyncingInformation) {
              console.log('Dysis syncing ...');
            }
            if (dysisConfig.sync.showNotificationWhenSyncing) {
              this.notifyUserAboutSync();
            }
          }
        });
      }
    });    
  }

  protected async syncUsageTime(usageTime: number) {
    const response = await DysisRequest.post(
      'tracking/update/dysis',
      {
        'participantID': this.participantID,
        'totalUsageTime': usageTime,
      }
    )
    if (response) {
      console.log(response);
    } else {
      throw new Error(response);
    }
  } 

  protected async isCurrentActiveTab(): Promise<boolean> {
    // Retrieves the open tabs which are active and in focus
    const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    // Returns true if the active and focused tab matches the tracking site URL
    return tabs.length > 0 && tabs[0].url.includes(this.trackingSiteUrl);
  }

  protected notifyUserAboutSync() {
    // Displays a browser notification about the sync
    chrome.notifications.create('NOTFICATION_ID', {
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'DYSIS',
      message: 'Syncing usage time for study purpose ...',
      priority: 2
    })
  }
}
