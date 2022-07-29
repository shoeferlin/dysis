import analyzeRequest from './ToxicityStrategyPerspectiveGoogleClientImplementation.js';
import { ToxicityStategyI, ToxicityI } from './ToxicityStategyInterface.js';
import { limitByteSizeOfText } from '../../helpers/utils.js';

export default class ToxicityStrategyPerspectiveGoogleClient implements ToxicityStategyI {
  async analyze(text: string): Promise<ToxicityI> {
    const limitedText = limitByteSizeOfText(text, 20480, 10);
    const response = await analyzeRequest(limitedText, process.env.GOOGLE_API_KEY);
    if (response) {
      return this.googleClientAdapter(response.data);
    }
    throw Error('Error while calling perspective API');
  }

  private googleClientAdapter(input: any): any {
    const toxicity: ToxicityI = {
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
