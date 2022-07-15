export default class DysisBackgroundTracking {

  protected trackingSiteName: string; 
  protected trackingSiteUrl: string;
  protected trackingIntervalInSeconds: number;
  protected syncIntervalInSeconds: number;

  protected backgroundAlarmVariableName: string;
  protected usageTimeTotalVariableName: string;
  protected usageTimeIncrementVariableName: string;

  protected browserActivityState: string = 'active'

  constructor(
    // Constructor parameters
    trackingSiteName: string,
    trackingSiteUrl: string,
    trackingIntervalInSeconds: number = 1,
    syncIntervalInSeconds: number = 30,
  ) {
    // Set variables
    this.trackingSiteName = trackingSiteName;
    this.trackingSiteUrl = trackingSiteUrl;
    this.trackingIntervalInSeconds = trackingIntervalInSeconds;
    this.syncIntervalInSeconds = syncIntervalInSeconds;
    // Set derived variables
    this.backgroundAlarmVariableName = `${this.trackingSiteName}Tracking`;
    this.usageTimeTotalVariableName = `${this.trackingSiteName}UsageTimeTotal`
    this.usageTimeIncrementVariableName = `${this.trackingSiteName}UsageTimeIncrement`
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
        this.usageTimeTotalVariableName,
        this.usageTimeIncrementVariableName
      ], (res) => {
      chrome.storage.local.set({
        [this.usageTimeTotalVariableName]: this.usageTimeTotalVariableName in res ? res[this.usageTimeTotalVariableName] : 0,
        [this.usageTimeIncrementVariableName]: this.usageTimeIncrementVariableName in res ? res[this.usageTimeIncrementVariableName] : 0,
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
        console.log('Alarm firing')
        // Retrieve the total and increment usage time from the extension's local storage
        chrome.storage.local.get(
          [
            this.usageTimeTotalVariableName,
            this.usageTimeIncrementVariableName,
          ], (res) => {
            // Create local variables from the retrieved local storage
            let usageTimeTotal: number = res[this.usageTimeTotalVariableName];
            // Note for increment: The increment time is the one that will be synced with the server
            let usageTimeIncrement: number = res[this.usageTimeIncrementVariableName];
            // Asyncly get the active tab
            this.isCurrentActiveTab().then((isCurrentActiveTab) => {
              // Usage times should only increase if the following conditions for a 'tick' are met:
              // 1) The current active tab matches the url of this instance
              // 2) The browser state is as active (can also be idle or locked)
              if (isCurrentActiveTab && this.browserActivityState === 'active') {
                // Increase the usage times by one 'tick'
                usageTimeTotal = usageTimeTotal + this.trackingIntervalInSeconds;
                usageTimeIncrement = usageTimeIncrement + this.trackingIntervalInSeconds;
                // Log a tick to the console
                console.log(`Tick for ${this.trackingSiteName} (Total usage time: ${usageTimeTotal} s)`)
                // Set the new increased usage times
                chrome.storage.local.set({
                  [this.usageTimeTotalVariableName]: usageTimeTotal,
                  [this.usageTimeIncrementVariableName]: usageTimeIncrement,
              });
            }
          });
          // Sync according according to the given sync interval
          if (usageTimeTotal % this.syncIntervalInSeconds === 0) {
            // The code that will be executed to sync the time
            console.log('Dysis syncing ...');
            this.notifyUserAboutSync();
          }
        });
      }
    });    
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
