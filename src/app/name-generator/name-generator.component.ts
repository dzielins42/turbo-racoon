import { Component, Input, OnInit } from '@angular/core';

import { NameGenerator } from './name-generator';

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
    this.generatedItems = this._generator.generateMultiple(count);
  }

}
