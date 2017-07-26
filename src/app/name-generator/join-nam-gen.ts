import { NameGenerator } from './name-generator';

export class JoinNameGenerator extends NameGenerator {

  constructor(
    private _first : NameGenerator,
    private _second : NameGenerator,
    private _separator : string
  ) {
    super();
  }

  generate() : string {
    return this._first.generate() + this._separator + this._second.generate();
  }
}
