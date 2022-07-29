import { PerspectiveStrategyI, PerspectiveI } from './strategies/PerspectiveStrategyInterface.js';
import PerspectiveStrategyGoogleClient from './strategies/PerspectiveStrategyGoogleClient.js';

import log from '../../helpers/log.js';

export default class PerspectiveContext {
  static perspectiveStrategy: PerspectiveStrategyI = new PerspectiveStrategyGoogleClient();
  // static perspectiveStrategy: PerspectiveStrategyI = new PerspectiveStrategyFetch();
  // static perspectiveStrategy: PerspectiveStrategyI = new PerspectiveStrategyTensorflow();

  static async analyze(text: string): Promise<PerspectiveI> {
    log.info('PERSPECTIVE', `Using strategy: ${this.perspectiveStrategy.constructor.name}`);
    log.info('PERSPECTIVE', `Analyzing the following text:\n"${text.slice(0, 560)} [...]"`);
    return this.perspectiveStrategy.analyze(text);
  }
}
