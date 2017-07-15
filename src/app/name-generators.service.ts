import { Injectable } from '@angular/core';

import { NameGenerator } from './name-generator/name-generator';
import { DummyNameGenerator } from './name-generator/dummy-name-generator';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class NameGeneratorsService {

  generators: {[key: string]: NameGenerator} = {};

  constructor() {
    this.generators["dummy"] = new DummyNameGenerator();
  }

  getGenerator(id: string) : Observable<NameGenerator> {
    return Observable.of(this.generators[id]);
  }

}
