import axios, { AxiosPromise } from 'axios';
import dotenv from 'dotenv';

import { ToxicityStategyI, ToxicityI } from './ToxicityStategyInterface.js';
import { limitByteSizeOfText } from '../../helpers/utils.js';

export default class ToxicityStrategyPerspectiveFetch implements ToxicityStategyI {
  private googleApiKey: string;

  constructor() {
    dotenv.config();
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error('Google API key not set in .env-file');
    } else {
      this.googleApiKey = process.env.GOOGLE_API_KEY;
    }
  }

  async analyze(text: string): Promise<ToxicityI> {
    const limitedText = limitByteSizeOfText(text, 20480, 10);
    const response = await this.postRequestToGooglePerspectiveAPI(limitedText);
    if (response.statusText === 'OK') {
      return this.googlePerspectiveAdapter(response.data);
    }
    throw Error('Error while calling perspective API');
  }

  private googlePerspectiveAdapter(input: any): ToxicityI {
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

  postRequestToGooglePerspectiveAPI(text: string): AxiosPromise<any> {
    return axios.post(
      `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${this.googleApiKey}`,
      {
        comment: { text },
        requestedAttributes: {
          TOXICITY: {},
          SEVERE_TOXICITY: {},
          PROFANITY: {},
          IDENTITY_ATTACK: {},
          THREAT: {},
          INSULT: {},
        },
        doNotStore: true,
      },
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
  }
}
