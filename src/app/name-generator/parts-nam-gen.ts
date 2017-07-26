import { NameGenerator } from './name-generator';

export class PartsNameGenerator extends NameGenerator {

  constructor(
    private _parts : NameGenerator[],
    private _separator : string = ""
  ) {
    super();
  }

  generate() : string {
    let results : string[] = [];
    for (let i = 0; i < this._parts.length; i++) {
      results.push(this._parts[i].generate());
    }

    return results.join(this._separator);
  }
}
