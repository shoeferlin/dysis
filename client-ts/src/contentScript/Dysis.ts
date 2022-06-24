// TODO: content script

import {DysisAcademia} from './DysisAcademia';
import {DysisElementCollectorAbstract} from './DysisElementCollectorAbstract';
import {DysisElementCollectorUser} from './DysisElementCollectorUser';
import {DysisEnrichmentFactory} from './DysisEnrichmentFactory';

class Dysis {
  tracking: DysisAcademia;
  factory: DysisEnrichmentFactory;
  collector: DysisElementCollectorAbstract;

  constructor() {
    console.log('Dysis App started ...')
    this.tracking = new DysisAcademia();
    this.factory = new DysisEnrichmentFactory();
    this.collector = new DysisElementCollectorUser();
    this.update();
  }

  update() {
    const x = this.factory.create('user', document.body)
  }
}

const dysis: Dysis = new Dysis;
