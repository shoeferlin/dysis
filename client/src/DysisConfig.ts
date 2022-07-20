export const dysisConfig = {
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
