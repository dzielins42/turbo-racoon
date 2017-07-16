import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { NameGenerator } from './name-generator/name-generator';
import { NameGeneratorWrapper } from './name-generator/nam-gen-wrapper';
import { DummyNameGenerator } from './name-generator/dummy-name-generator';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';

@Injectable()
export class NameGeneratorsService {

  generators: {[key : string]: NameGenerator} = {};

  constructor(private http: Http) {
    this.initGenerators();
  }

  getGenerator(id: string) : Observable<NameGenerator> {
    return Observable.of(this.generators[id]);
  }

  private initGenerators() {
    //this.generators["dummy"] = new DummyNameGenerator();

    let o1 = this.getArraysToLoad()
        .flatMap(arraysToLoad => Observable.from(arraysToLoad));
    let o2 = o1.concatMap(arrayToLoad => this.loadArray(arrayToLoad));
    let observable = Observable.zip(
        o1,
        o2,
        (arrayToLoad, loadedArray) => {
            return { id: arrayToLoad, array: loadedArray };
        }
    );
    observable
        .toArray()
        .flatMap(loadedArrays => this.buildGenerators(loadedArrays))
        .subscribe(generatorWrapper => this.generators[generatorWrapper.id] = generatorWrapper.generator);
  }

  private loadArray(uri : string) : Observable<string[]> {
    return this.http.get(uri).map(response => response.json() as string[]);
  }

  private getArraysToLoad() : Observable<string[]> {
    return Observable.of([
        'assets/human_name_basic.json',
        'assets/human_name_male_list1.json',
    ]);
  }
  
  private buildGenerators(arrays) : Observable<NameGeneratorWrapper> {
    console.log(arrays);
    return Observable.create(observer => {
      observer.next(new NameGeneratorWrapper("dummy", new DummyNameGenerator()));
      observer.complete();
    });
  }

}
