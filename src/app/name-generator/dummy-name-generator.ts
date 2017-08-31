import { LocalNameGenerator } from './local-name-generator';

export class DummyNameGenerator extends LocalNameGenerator {
  generateSingle() : string {
    return "dummy";
  }
}
