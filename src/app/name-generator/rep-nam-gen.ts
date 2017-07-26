import { NameGenerator } from './name-generator';

export class RepetitiveNameGenerator extends NameGenerator {

  constructor(
    private _base : NameGenerator,
    private _separator : string,
    private _minReps : number,
    private _maxReps : number,
  ) {
    super();
  }

  generate() : string {
    let reps = this.getRandomInt(this._minReps, this._maxReps);
    let results : string[] = [];
    for (let i = 0; i < reps; i++) {
      results.push(this._base.generate());
    }

    return results.join(this._separator);
  }
}
