export abstract class DysisAbstract {

  source: HTMLElement;

  constructor(source: HTMLElement) {
    this.source = source;
  }

  abstract update(): void;
}