import {DysisReddit} from './DysisReddit';
import {DysisRequest} from './DysisRequest';

export class DysisRedditEnrichment {

  hostingElement: HTMLAnchorElement;
  dysisContainer: HTMLElement;
  identifier: String;

  constructor(hostingElement: HTMLAnchorElement) {
    this.hostingElement = hostingElement;
    this.identifier = DysisReddit.getUsernameParamFromPath(hostingElement.href);
    console.log(`Dysis User Enrichment created for "${this.identifier}"...`)
    this.createContainerElement();
    // this.displayLoading();
    this.displayData();
  }

  createContainerElement() {
    const dysisContainer = document.createElement('div');
    dysisContainer.classList.add('dysis');
    dysisContainer.style.backgroundColor = '#f2f2f2';
    dysisContainer.style.overflowWrap ='anywhere';
    dysisContainer.style.margin = '2px 0px';
    dysisContainer.style.padding = '3px';
    dysisContainer.style.borderRadius = '2px';
    dysisContainer.style.fontSize = '12px';
    dysisContainer.style.width = '100%';

    // const text = document.createElement('div');
    // text.classList.add('dysis');
    // text.style.color = '#BF0000';
    // text.innerText = `  DYSIS loading ...  `;

    this.hostingElement.parentElement.parentElement.parentElement.parentElement.parentElement.insertAdjacentElement('beforeend', dysisContainer);
    this.hostingElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.flexWrap = 'wrap';
    
    this.dysisContainer = dysisContainer;

    // this.dysisContainer.appendChild(text);
    
  }

  // getBehaviorElement(tagName: string, tagValue: number): string {
  //   let behaviorValueClass: string;
  //   if (tagValue > 0.66) {
  //     behaviorValueClass = 'dysis-tag-behavior-red';
  //   } else if (tagValue > 0.33) {
  //     behaviorValueClass = 'dysis-tag-behavior-yellow';
  //   } else {
  //     behaviorValueClass = 'dysis-tag-behavior-green';
  //   }
  //   return `<span class="dysis-tag"><span class="dysis-tag-left dysis-tag-behavior">${tagName}</span><span class="dysis-tag-right ${behaviorValueClass}">${tagValue}</span></span>`;
  // }

  // displayLoading() {
  //   const loadingCirle = document.createElement('div');
  //   loadingCirle.style.display = 'inline-block';
  //   loadingCirle.classList.add('loader');
  //   this.dysisContainer.appendChild(loadingCirle);
  // }

  async displayData() {
    const response = await this.requestData();

    console.log(response)

    const dataElement = document.createElement('div');    

    const dataTextElement = document.createElement('p');
    // dataTextElement.innerText = `${JSON.stringify(response)}`
    dataTextElement.innerText = 'Aenean eu leo quam.'
    dataElement.appendChild(dataTextElement);
    this.dysisContainer.innerHTML = ''
    this.dysisContainer.appendChild(dataElement);
  }

  async requestData(): Promise<any> {
    const response = await DysisRequest.get(`reddit?identifier=${this.identifier}`);
    return response.data;
  }
}
