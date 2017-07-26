import { NameGenerator } from './name-generator';

export class RandomizedNameGenerator extends NameGenerator {

  constructor(
    private _parts : NameGenerator[],
  ) {
    super();
  }

  generate() : string {
    return this._parts[this.getRandomInt(0, this._parts.length - 1)].generate();
  }
}
