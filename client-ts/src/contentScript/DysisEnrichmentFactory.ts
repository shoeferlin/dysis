type DYSIS_ENRICHMENT_TYPE = 'user';
import {DysisEnrichmentUser} from './DysisEnrichmentUser';

export class DysisEnrichmentFactory {
  create(type: DYSIS_ENRICHMENT_TYPE, hostingElement: HTMLElement) {
    switch(type) {
      case('user'): {
        return new DysisEnrichmentUser(hostingElement)
      }
    }
  }
}