import analyzeRequest from './PerspectiveStrategyGoogleClientImplementation.js';
import { PerspectiveStrategyI, PerspectiveI } from './PerspectiveStrategyInterface.js';
import { limitByteSizeOfText } from '../../../helpers/utils.js';

export default class PerspectiveStrategyGoogleClient implements PerspectiveStrategyI {
  async analyze(text: string): Promise<PerspectiveI> {
    const limitedText = limitByteSizeOfText(text, 20480, 10);
    const response = await analyzeRequest(limitedText, process.env.GOOGLE_API_KEY);
    if (response) {
      return this.googleClientAdapter(response.data);
    }
    throw Error('Error while calling perspective API');
  }

  private googleClientAdapter(input: any): any {
    const toxicity: PerspectiveI = {
      toxicity: input.attributeScores?.TOXICITY?.summaryScore.value ?? null,
      severeToxicity: input.attributeScores?.SEVERE_TOXICITY?.summaryScore.value ?? null,
      identityAttack: input.attributeScores?.IDENTITY_ATTACK?.summaryScore.value ?? null,
      insult: input.attributeScores?.INSULT.summaryScore?.value ?? null,
      threat: input.attributeScores?.THREAT.summaryScore?.value ?? null,
      profanity: input.attributeScores?.PROFANITY.summaryScore?.value ?? null,
    };
    return toxicity;
  }
}
