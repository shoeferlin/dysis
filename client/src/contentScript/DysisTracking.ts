export default class DysisTracking {

  public participantID: string;

  private MAX_IDLE_TIME_IN_SECONDS: number = 40;
  private TRACKING_INTERVAL_IN_SECONDS: number = 1;

  private timeOfLastAction: number = Date.now();
  private browserActivityState: string = 'active';

  constructor() {
    if (this.didUserGiveConsent) {
      console.log('Dysis Tracking started ...');
      this.setDefaultLocalStorageValues();
      this.createBackgroundBrowserActivityStateListener();
      this.createTimeOfLastActivityListeners();
      this.track();
    }
  }

  private didUserGiveConsent(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.get(
          [
            'dysisParticipantAgreedToTerms',
            'dysisParticipantSubmitted',
            'participantID',
          ], (res) => {
            this.participantID = res.participantID;
            if (res.dysisParticipantAgreedToTerms && res.dysisParticipantSubmitted) {
              resolve(true);
            } else {
              resolve(false)
            }
          }
        );
      } catch (error) {
        reject(false)
      }
    })
  }

  private setDefaultLocalStorageValues() {
    chrome.storage.local.get(
    [
      'dysisUsageTime',
    ], (res) => {
      chrome.storage.local.set({
        dysisUsageTime: 'dysisUsageTime' in res ? res.dysisUsageTime : 0,
      });
    })
  }  

  private track() {
    setInterval(
      () => {
        this.tick();
      },
      this.TRACKING_INTERVAL_IN_SECONDS * 1000,
    )
  }

  private tick() {
    if (
      document.visibilityState === 'visible'
      && this.browserActivityState === 'active'
      && (Date.now() - this.timeOfLastAction) < this.MAX_IDLE_TIME_IN_SECONDS * 1000
    ) {
      this.increaseUsageTimeByOneTick();
    }
  }

  private increaseUsageTimeByOneTick() {
    console.log(`Dysis ticking (${new Date().toLocaleTimeString()})`);
    chrome.storage.local.get(
      [
        'dysisUsageTime',
      ], (res) => {
        const dysisUsageTimeBeforeTick = res.dysisUsageTime;
        const dysisUsageTimeAfterTick = dysisUsageTimeBeforeTick + this.TRACKING_INTERVAL_IN_SECONDS;
        chrome.storage.local.set({
          dysisUsageTime: dysisUsageTimeAfterTick,
        })
      }
    )
  };

  private createTimeOfLastActivityListeners() {
    const setTimeOfLastActivity = () => {
      this.timeOfLastAction = Date.now();
    }
    document.addEventListener('click', setTimeOfLastActivity);
    document.addEventListener('scroll', setTimeOfLastActivity);
    document.addEventListener('mousemove', setTimeOfLastActivity);
    document.addEventListener('keydown', setTimeOfLastActivity)
  }

  
  private createBackgroundBrowserActivityStateListener() {
    chrome.runtime.onMessage.addListener(
      (message) => {
        if ('browserActivityState' in message) {
          this.browserActivityState = message.browserActivityState;
        }
      }
    )
  }
}
