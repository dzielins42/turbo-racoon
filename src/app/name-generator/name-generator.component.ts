import { Component, Input, OnInit } from '@angular/core';

import { NameGenerator } from './name-generator';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-name-generator',
  templateUrl: './name-generator.component.html',
  styleUrls: ['./name-generator.component.css']
})
export class NameGeneratorComponent implements OnInit {

  private _generator : NameGenerator;
  @Input()
  set generator(value : NameGenerator) {
    this._generator = value;
    this.generate();
  }
  generatedItems: string[];

  constructor() { }

  ngOnInit() { }

  generate() {
    this.generateMultiple(10);
  }

  generateMultiple(count : number) {
    // Clears array
    this.generatedItems = new Array(count);
    let i = 0;
    this._generator.generate(count)
      // This delay is to simulate remote requests for name generation
      .map(
        generatedValue => Observable.of(generatedValue).delay((1 + Math.random()) * 500)
      )
      .concatAll()
      .subscribe(
        generatedValue => {
          this.generatedItems[i] = generatedValue;
          i++;
        },
        error => {},
        () => {}
      );
  }

}
