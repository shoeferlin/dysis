// TODO: content script

import {DysisUsage} from './DysisUsage';
import {DysisAbstract} from './DysisAbstract';
import {DysisReddit} from './DysisReddit';
import {DysisTwitter} from './DysisTwitter';

class Dysis {
  usage: DysisUsage;
  modules: DysisAbstract[];
  constructor() {
    console.log('Dysis App started ...')
    console.log('Refresh test 2')

    this.usage = new DysisUsage();

    this.modules = [
      new DysisReddit(document.body),
      new DysisTwitter(document.body),
    ]
    this.init();
  }

  init() {
    for (const module of this.modules) {
      module.init();
    }
  }
  
}
const dysis: Dysis = new Dysis();

