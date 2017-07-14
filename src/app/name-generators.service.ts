import { Injectable } from '@angular/core';

import { DummyNameGenerator } from './name-generator/dummy-name-generator';

@Injectable()
export class NameGeneratorsService {

  constructor() { }

  getGenerator(id: string) {
    return new DummyNameGenerator();
  }

}
