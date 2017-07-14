import { NameGenerator } from './name-generator';

export class DummyNameGenerator extends NameGenerator {
  generate() : string {
    return "dummy";
  }
}
