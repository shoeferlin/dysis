import {DysisAbstract} from './DysisAbstract';
import {DysisReddit} from './DysisReddit';
import {DysisZeit} from './DysisZeit';

export default class Dysis {
  modules: DysisAbstract[];
  constructor() {
    console.log('Dysis App started ...')

    this.modules = [
      // Add modules to this array
      new DysisReddit(document.body),
      new DysisZeit(document.body),
    ]
    this.init();
  }

  init() {
    for (const module of this.modules) {
      module.init();
    }
  }
}

new Dysis();
