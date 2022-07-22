export const dysisConfig = {
  requests: {
    lowerBoundForFailedRequestTimeoutInSeconds: 2,
    upperBoundForFailedRequestTimeoutInSeconds: 5,
    maxNumberOfRequestAttempts: null,
  },
  sync: {
    showNotificationWhenSyncing: true,
    defaultTrackingIntervalInSeconds: 1,
    defaultSyncIntervalInSeconds: 10,
  },
  debug: {
    displayMutationRecords: false,
    displayLocalStorageChanges: false,
    displayUsageTimeTicks: true,
    displayEnrichmentDataObjects: false,
    displayEnrichmentInstancesCreated: false,
    displaySyncingInformation: false,
    displaySyncing: true,
    displayRequestTimeoutsAndRetries: true,
  },
  reddit: {
    behavior: {
      lowerLimitForUncertain: 60,
      lowerLimitForLikely: 80,
    },
    interests: {
      maxNumberOfDisplayedInterests: 10,
    }
  },
}
