chrome.runtime.onInstalled.addListener(() => {
  console.log('Dysis background script initiated ...')
})

const TRACKING_INTERVAL_IN_SECONDS: number = 1;
const SYNC_INTERVAL_IN_SECONDS: number = 30;
const TRACKING_SITE_URL: string = 'reddit.com'

// Setting default values
chrome.storage.local.get(["dysisRedditTimeSpent"], (res) => {
  chrome.storage.local.set({
    dysisRedditTimeSpent: "dysisRedditTimeSpent" in res ? res.dysisRedditTimeSpent : 0,
  });
});

// Create interval for background script
chrome.alarms.create("dysisTracking", {
  periodInMinutes: TRACKING_INTERVAL_IN_SECONDS / 60
});

// Check for idle state
let activityState: string = 'active';
console.log(activityState)
chrome.idle.onStateChanged.addListener(
  (indleState) => {
    console.log(indleState);
    activityState = indleState;
  }
)

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name == "dysisTracking") {
    chrome.storage.local.get(["dysisRedditTimeSpent"], (res) => {
      // Condition for a tick (reddit primary tab and no idle of mouse)
      let dysisRedditTimeSpent: number = res.dysisRedditTimeSpent
      isCurrentTabReddit().then((currentTabIsReddit) => {
        if (currentTabIsReddit && activityState === 'active') {
          dysisRedditTimeSpent = dysisRedditTimeSpent + TRACKING_INTERVAL_IN_SECONDS;
          console.log(`Tick, total time ${dysisRedditTimeSpent}`)
          chrome.storage.local.set({
            dysisRedditTimeSpent,
          });
        }
      });
      // Sync according to SYNC_INTERVAL_IN_SECONDS
      if (dysisRedditTimeSpent % SYNC_INTERVAL_IN_SECONDS === 0) {
          console.log('Dysis syncing ...')
          chrome.notifications.create('NOTFICATION_ID', {
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'DYSIS',
            message: 'Syncing usage time for study purpose ...',
            priority: 2
        })
      }
    });
  }
});

async function isCurrentTabReddit(): Promise<boolean> {
  const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  return tabs.length > 0 && tabs[0].url.includes(TRACKING_SITE_URL);
}
