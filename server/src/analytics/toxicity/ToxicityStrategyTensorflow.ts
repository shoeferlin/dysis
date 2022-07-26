import toxicity from '@tensorflow-models/toxicity';

import { ToxicityStategyI, ToxicityI } from './ToxicityStategyInterface.js';

export default class ToxicityStrategyTensorflow implements ToxicityStategyI {
  constructor() {
    this.init();
  }

  init(): void {
    console.log('Tensorflow Strategy');
  }

  async analyze(text: string): Promise<ToxicityI> {
    const prediction = await this.tensorflowToxicity(text);
    return this.tensorflowToxicityAdapter(prediction);
  }

  async tensorflowToxicity(text: string) {
    const threshold: number = 0.9;
    const model = await toxicity.load(threshold, []);
    console.log(`Getting Tensorflow Toxicity for:\n'${text}'`);
    const prediction = await model.classify(text);
    return prediction;
  }

  private tensorflowToxicityAdapter(tensorflowToxicity: any): ToxicityI {
    const toxicityResult: ToxicityI = { };
    tensorflowToxicity.forEach((element: any) => {
      switch (element.label) {
        case ('toxicity'):
          toxicityResult.toxicity = element.results[0].probabilities['1'];
          break;
        case ('identity_attack'):
          toxicityResult.identityAttack = element.results[0].probabilities['1'];
          break;
        case ('insult'):
          toxicityResult.insult = element.results[0].probabilities['1'];
          break;
        case ('severe_toxicity'):
          toxicityResult.severeToxicity = element.results[0].probabilities['1'];
          break;
        case ('threat'):
          toxicityResult.threat = element.results[0].probabilities['1'];
          break;
        default:
          break;
      }
    });
    return toxicityResult;
  }
}
