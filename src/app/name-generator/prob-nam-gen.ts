import { NameGenerator } from './name-generator';

export class ProbabilityNameGenerator extends NameGenerator {

  constructor(
    private _parts : NameGenerator[],
    private _probability : number[]
  ) {
    // TODO validate
    // TODO normalize _probability
    super();
  }

  generate() : string {
    let rando = Math.random();
    let sum = 0;

    for (let i = 0; i < this._probability.length; i++) {
      sum += this._probability[i];
      if (rando < sum) {
        return this._parts[i].generate();
      }
    }

    // Should not happen, but may be caused by floating point inequality problem
    return this._parts[this._probability.length - 1].generate();
  }
}
