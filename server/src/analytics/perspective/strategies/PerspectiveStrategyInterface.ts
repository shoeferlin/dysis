export interface PerspectiveI {
  toxicity?: number,
  severeToxicity?: number,
  identityAttack?: number,
  insult?: number,
  obscene?: number,
  sexualExplicit?: number,
  threat?: number,
  profanity?: number,
}

export interface PerspectiveStrategyI {
  // eslint-disable-next-line no-unused-vars
  analyze(text: string): Promise<PerspectiveI>;
}
