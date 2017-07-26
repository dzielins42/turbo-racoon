import { NameGenerator } from './name-generator';

export class PartsNameGenerator extends NameGenerator {

  constructor(
    private _parts : NameGenerator[]
  ) {
    super();
  }

  generate() : string {
    let result : string = "";
    for(let i = 0; i < this._parts.length; i++) {
      result += this._parts[i].generate();
    }

    return result;
  }
}
