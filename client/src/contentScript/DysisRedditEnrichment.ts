import {DysisReddit} from './DysisReddit';
import {DysisRequest} from '../DysisRequest';
import {dysisConfig} from '../DysisConfig';

export class DysisRedditEnrichment {

  hostingElement: HTMLAnchorElement;
  dysisContainer: HTMLElement;
  dysisTagContainer: HTMLElement;
  identifier: String;

  LOWER_LIMIT_FOR_BEHAVIOR_UNCERTAIN: number = dysisConfig.reddit.behavior.lowerLimitForUncertain;
  LOWER_LIMIT_FOR_BEHAVIOR_LIKELY: number = dysisConfig.reddit.behavior.lowerLimitForLikely;
  MAX_NUMBER_OF_SUBREDDITS: number = dysisConfig.reddit.interests.maxNumberOfDisplayedInterests;

  constructor(hostingElement: HTMLAnchorElement) {
    this.hostingElement = hostingElement;
    this.identifier = DysisReddit.getUsernameParamFromPath(hostingElement.href);
    console.log(`Dysis User Enrichment created for "${this.identifier}"...`)
    this.createContainerElement();
    this.displayLoading();
    this.displayData();
  }

  private createContainerElement() {
    const dysisContainer = document.createElement('div');
    dysisContainer.classList.add('dysis');

    this.hostingElement.parentElement.insertAdjacentElement('beforeend', dysisContainer);
    this.hostingElement.parentElement.classList.add('dysis-hosting-element');
    
    this.dysisContainer = dysisContainer;   

    const tagContainer = document.createElement('div');    
    this.dysisContainer.appendChild(tagContainer);
    this.dysisTagContainer = tagContainer
  }

  private async displayLoading() {
    const tagContainer = this.dysisTagContainer

    tagContainer.style.overflowWrap = 'anywhere';

    tagContainer.insertAdjacentHTML(
      'beforeend',
      `<span class="dysis-tag">
        <span class="dysis-text">
          <b>DYSIS</b> loading...  <div class="loader" style="display: inline-block"></div>
        </span>
      </span>`)
  }

  private async displayData() {
    await this.requestData().then((response) => {
      const tagContainer = this.dysisTagContainer

      console.log(response)

      tagContainer.innerHTML = '';

      // Create behavioral tags
      if (response?.analytics?.perspective?.toxicity) {
        tagContainer.insertAdjacentHTML(
          'beforeend',
          this.createBehaviorElement('toxicity', response.analytics.perspective.toxicity)
        )
      }
      if (response?.analytics?.perspective?.severeToxicity) {
        tagContainer.insertAdjacentHTML(
          'beforeend',
          this.createBehaviorElement('severe toxicity', response.analytics.perspective.severeToxicity)
        )
      }
      if (response?.analytics?.perspective?.insult) {
        tagContainer.insertAdjacentHTML(
          'beforeend', 
          this.createBehaviorElement('insult', response.analytics.perspective.insult)
        )
      }
      if (response?.analytics?.perspective?.identityAttack) {
        tagContainer.insertAdjacentHTML(
          'beforeend', 
          this.createBehaviorElement('identity attack', response.analytics.perspective.identityAttack)
        )
      }
      if (response?.analytics?.perspective?.threat) {
        tagContainer.insertAdjacentHTML(
          'beforeend', 
          this.createBehaviorElement('threat', response.analytics.perspective.threat)
        )
      }

      // Create interests tags (max. 10)
      for (const interests of response.context.subreddits.slice(0, this.MAX_NUMBER_OF_SUBREDDITS)) {
        tagContainer.insertAdjacentHTML(
          'beforeend',
          this.createInterestsElement(interests.subreddit, interests.count)
        )
      }

      // Create activity tags
      if (response?.metrics?.averageScoreSubmissions) {
        tagContainer.insertAdjacentHTML(
          'beforeend',
          this.createMetricsElement(
            '\&#8709 score for submissions', 
            response.metrics.averageScoreSubmissions)
        )
      }
      if (response?.metrics?.averageScoreComments) {
        tagContainer.insertAdjacentHTML(
          'beforeend',
          this.createMetricsElement(
            '\&#8709 score for comments',
            response.metrics.averageScoreComments)
        )
      }
    });
  }

  private async requestData(): Promise<any> {
    const response = await DysisRequest.get(`api/reddit?identifier=${this.identifier}`);
    return response.data;
  }

  private createBehaviorElement(tagName: string, tagValue: number): string {
    let behaviorValueClass: string;
    if (tagValue >= this.LOWER_LIMIT_FOR_BEHAVIOR_LIKELY) {
      behaviorValueClass = 'dysis-tag-behavior-red';
    } else if (tagValue >= this.LOWER_LIMIT_FOR_BEHAVIOR_UNCERTAIN) {
      behaviorValueClass = 'dysis-tag-behavior-yellow';
    } else {
      behaviorValueClass = 'dysis-tag-behavior-green';
    }
    return `
    <span class="dysis-tag">
      <span class="dysis-tag-left dysis-tag-behavior">
        ${tagName}
      </span>
      <span class="dysis-tag-right ${behaviorValueClass}">
        ${(tagValue * 100).toFixed(0).toString()}%
      </span>
    </span>
    `;
  }
  
  private createInterestsElement(tagName: string, tagValue: number): string {
    return `
    <span class="dysis-tag">
      <span class="dysis-tag-left dysis-tag-interests">
        ${tagName}
      </span>
      <span class="dysis-tag-right dysis-tag-interests">
        ${tagValue.toString()}x
      </span>
    </span>`;
  }

  private createMetricsElement(tagName: string, tagValue: number): string {
    return `
    <span class="dysis-tag">
      <span class="dysis-tag-left dysis-tag-metrics">
        ${tagName}
      </span>
      <span class="dysis-tag-right dysis-tag-metrics">
        ${tagValue.toFixed(2).toString()}
      </span>
    </span>`;
  }
}
