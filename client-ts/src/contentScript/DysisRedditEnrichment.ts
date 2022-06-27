export class DysisRedditEnrichment {

  hostingElement: Element;
  identifier: String;

  constructor(hostingElement: Element) {
    console.log('Dysis User Enrichments created ...')
    this.hostingElement = hostingElement;
    this.createElement();
  }

  createElement() {
    const enrichment = document.createElement('span');
    enrichment.innerText = '  DYSIS  '
    enrichment.classList.add('dysis');
    enrichment.style.color = 'red';
    this.hostingElement.appendChild(enrichment);
  }
}