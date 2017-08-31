import { Observable } from 'rxjs/Observable';

export abstract class NameGenerator {
  abstract generate(count : number) : Observable<string>;
}
