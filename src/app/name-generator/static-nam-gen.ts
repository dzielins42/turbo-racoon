import { NameGenerator } from './name-generator';

export class StaticNameGenerator extends NameGenerator {

  constructor(
    private _value : string
  ) {
    super();
  }

  generate() : string {
    return this._value;
  }
}
