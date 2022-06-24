import type {DysisEnrichmentAbstract} from './DysisEnrichmentAbstract';

export class DysisEnrichmentUser implements DysisEnrichmentAbstract {

  hostingElement: HTMLElement;

  constructor(hostingElement: HTMLElement) {
    console.log('Dysis User Enrichtment created ...')
    this.hostingElement = hostingElement;
    this.beep()
  }

  beep(): void {
    setInterval(
      () => {
        console.log('Beep');
      },
      1000
    )
  }
}