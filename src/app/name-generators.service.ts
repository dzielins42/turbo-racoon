import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { NameGenerator } from './name-generator/name-generator';
import { NameGeneratorWrapper } from './name-generator/nam-gen-wrapper';
import { DummyNameGenerator } from './name-generator/dummy-name-generator';
import { ArrayNameGenerator } from './name-generator/array-nam-gen';
import { PartsNameGenerator } from './name-generator/parts-nam-gen';
import { StaticNameGenerator } from './name-generator/static-nam-gen';
import { RepetitiveNameGenerator } from './name-generator/rep-nam-gen';
import { ProbabilityNameGenerator } from './name-generator/prob-nam-gen';
import { RandomizedNameGenerator } from './name-generator/rand-nam-gen';
import { CapitalizeNameGenerator } from './name-generator/name-generators';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/first';
import { BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class NameGeneratorsService {

  generators: {[key : string]: NameGenerator} = {};
  initialized : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: Http) {
    this.initGenerators();
  }

  // This builds NameGeneratorFront instances locally at runtime, but in the
  // future it may fetch them from some provider
  getAvailableGenerators() : Observable<NameGeneratorFront[]> {
    return Observable.create(observer => {
      let availableGenerators : NameGeneratorFront[] = [];
      availableGenerators.push(new NameGeneratorFront(
        "human-name-basic","Human Names (Basic)"
      ));
      availableGenerators.push(new NameGeneratorFront(
        "human-name-male-list1","Human Male Names (List1)"
      ));
      // Dwarf Name Generators
      availableGenerators.push(new NameGeneratorFront(
        "dwarf-name-male", "Dwarf Male Names"
      ));
      availableGenerators.push(new NameGeneratorFront(
        "dwarf-name-female", "Dwarf Female Names"
      ));
      availableGenerators.push(new NameGeneratorFront(
        "dwarf-name-clan", "Dwarf Clan Names"
      ));
      observer.next(availableGenerators);

      observer.complete();
    });
  }

  getGenerator(id: string) : Observable<NameGenerator> {
    // Cannot use Observable.of(this.generators[id]), because undefined value is passed to Observable.of
    // This will wait untill generators are initialized and then fire up provided observable which will take value from this.generators
    return this.ifReady(Observable.of(id).map(id => this.generators[id]));
  }

  private ifReady(observable : Observable<any>) : Observable<any> {
    return this.initialized.filter(x => x == true).first().flatMap(x => observable);
  }

  private initGenerators() {
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

    let arrays : {[key : string]: string[]} = {};

    observable
        .reduce((acc,curr)=>{acc[curr.id]=curr.array; return acc;}, arrays)
        .flatMap(loadedArrays => this.buildGenerators(loadedArrays))
        .subscribe(
          generatorWrapper => this.generators[generatorWrapper.id] = generatorWrapper.generator,
          error => {},
          () => this.initialized.next(true)
        );
  }

  private loadArray(uri : string) : Observable<string[]> {
    return this.http.get(uri).map(response => response.json() as string[]);
  }

  private getArraysToLoad() : Observable<string[]> {
    return Observable.of([
        'assets/human_name_basic.json',
        'assets/human_name_male_list1.json',

        'assets/generators/name/common/names_color.json',
        'assets/generators/name/common/names_gem.json',
        'assets/generators/name/common/names_metal.json',
        'assets/generators/name/common/names_wood.json',

        'assets/generators/name/dwarf/names_dwarf_prefix1.json',
        'assets/generators/name/dwarf/names_dwarf_male_suffix1.json',
        'assets/generators/name/dwarf/names_dwarf_female_suffix1.json',
        'assets/generators/name/dwarf/names_dwarf_clan_prefix1.json',
        'assets/generators/name/dwarf/names_dwarf_clan_suffix1.json',
    ]);
  }

  private buildGenerators(arrays) : Observable<NameGeneratorWrapper> {
    return Observable.create(observer => {
      observer.next(new NameGeneratorWrapper("dummy", new DummyNameGenerator()));
      observer.next(
        new NameGeneratorWrapper("human-name-basic",
        new ArrayNameGenerator(arrays["assets/human_name_basic.json"]))
      );
      observer.next(
        new NameGeneratorWrapper("human-name-male-list1",
        new ArrayNameGenerator(arrays["assets/human_name_male_list1.json"]))
      );
      // Common Name Generators
      let color = new ArrayNameGenerator(arrays["assets/generators/name/common/names_color.json"]);
      let gem = new ArrayNameGenerator(arrays["assets/generators/name/common/names_gem.json"]);
      let metal = new ArrayNameGenerator(arrays["assets/generators/name/common/names_metal.json"]);
      let wood = new ArrayNameGenerator(arrays["assets/generators/name/common/names_wood.json"]);
      // Dwarf Name Generators
      let dwarfSuffix = new ArrayNameGenerator(arrays["assets/generators/name/dwarf/names_dwarf_prefix1.json"]);
      observer.next(
        new NameGeneratorWrapper("dwarf-name-male",
        new PartsNameGenerator(
          [
            dwarfSuffix,
            new ArrayNameGenerator(arrays["assets/generators/name/dwarf/names_dwarf_male_suffix1.json"])
          ],
          ""
        ))
      );
      observer.next(
        new NameGeneratorWrapper("dwarf-name-female",
        new PartsNameGenerator(
          [
            dwarfSuffix,
            new ArrayNameGenerator(arrays["assets/generators/name/dwarf/names_dwarf_female_suffix1.json"])
          ],
          ""
        ))
      );
      observer.next(
        new NameGeneratorWrapper(
          "dwarf-name-clan",
          new CapitalizeNameGenerator(new PartsNameGenerator(
            [
              new RandomizedNameGenerator([
                color,
                gem,
                metal,
                wood,
                new ArrayNameGenerator(arrays["assets/generators/name/dwarf/names_dwarf_clan_prefix1.json"])
              ]),
              new ArrayNameGenerator(arrays["assets/generators/name/dwarf/names_dwarf_clan_suffix1.json"])
            ],
            ""
          ))
        )
      );

      observer.complete();
    });
  }

}

export class NameGeneratorFront {

  id : string;
  name : string;

  constructor(id : string, name : string) {
    this.id = id;
    this.name = name;
  }

}
