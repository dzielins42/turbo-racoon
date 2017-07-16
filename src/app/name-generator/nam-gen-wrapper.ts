import { NameGenerator } from './name-generator';

export class NameGeneratorWrapper {

  id : string;
  generator : NameGenerator;

  constructor(id : string, generator : NameGenerator) {
    this.id = id;
    this.generator = generator;
  }

}
