export const dysisConfig = {
  reddit: {
    behavior: {
      lowerLimitForUncertain: 60,
      lowerLimitForLikely: 80,
    },
    interests: {
      maxNumberOfDisplayedInterest: 10,
    }
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
  },
}
