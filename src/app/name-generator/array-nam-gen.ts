import { NameGenerator } from './name-generator';

export class ArrayNameGenerator extends NameGenerator {

  constructor(private array : string[]) { super(); }

  generate() : string {
    return this.array[this.getRandomInt(0, this.array.length - 1)];
  }
}
