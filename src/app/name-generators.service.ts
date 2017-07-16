import { Injectable } from '@angular/core';

import { NameGenerator } from './name-generator/name-generator';
import { DummyNameGenerator } from './name-generator/dummy-name-generator';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class NameGeneratorsService {

  generators: {[key: string]: NameGenerator} = {};

  constructor() {
    this.initGenerators();
  }

  getGenerator(id: string) : Observable<NameGenerator> {
    return Observable.of(this.generators[id]);
  }

  private initGenerators() {
    this.generators["dummy"] = new DummyNameGenerator();
  }

}
