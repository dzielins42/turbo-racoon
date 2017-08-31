import { Observable } from 'rxjs/Observable';

import { NameGenerator } from './name-generator';

export abstract class LocalNameGenerator extends NameGenerator {
  generate(count : number) : Observable<string> {
    return Observable.create(observer => {
      for (let i = 0; i < count; i++) {
        observer.next(this.generateSingle());
      }
      observer.complete();
    });
  }

  abstract generateSingle() : string;

  // Generates random number between min (inclusive) and max (inclusive)
  getRandomInt(min : number, max : number) : number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
