export const dysisConfig = {
  server: {
    // baseUrl: 'https://dysis-server.herokuapp.com/'
    baseUrl: 'http://localhost:8080/'
  },
  sync: {
    showNotificationWhenSyncing: false,
    defaultTrackingIntervalInSeconds: 1, 
    defaultSyncIntervalInMinutes: 10 / 60,
  },
  requests: {
    lowerBoundForFailedRequestTimeoutInSeconds: 5,
    upperBoundForFailedRequestTimeoutInSeconds: 10,
    maxNumberOfRequestAttempts: 3,
  },
  reddit: {
    timeoutUntilAnElementIsInViewportInMilliseconds: 125,
    behavior: {
      lowerLimitForUncertainInPercent: 60,
      lowerLimitForLikelyInPercent: 80,
    },
    interests: {
      maxNumberOfDisplayedInterests: 10,
    },
    activity: {
    }
  },
}
