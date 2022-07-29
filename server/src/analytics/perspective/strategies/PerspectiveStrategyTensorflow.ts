import toxicity from '@tensorflow-models/toxicity';

import { PerspectiveStrategyI, PerspectiveI } from './PerspectiveStrategyInterface.js';

export default class PerspectiveStrategyTensorflow implements PerspectiveStrategyI {
  async analyze(text: string): Promise<PerspectiveI> {
    const prediction = await this.tensorflowToxicity(text);
    return this.tensorflowToxicityAdapter(prediction);
  }

  private async tensorflowToxicity(text: string) {
    const threshold: number = 0.9;
    const model = await toxicity.load(threshold, []);
    console.log(`Getting Tensorflow Toxicity for:\n'${text}'`);
    const prediction = await model.classify(text);
    return prediction;
  }

  private tensorflowToxicityAdapter(tensorflowToxicity: any): PerspectiveI {
    const toxicityResult: PerspectiveI = { };
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
