import { Component, Input, OnInit } from '@angular/core';

import { NameGenerator } from './name-generator';

@Component({
  selector: 'app-name-generator',
  templateUrl: './name-generator.component.html',
  styleUrls: ['./name-generator.component.css']
})
export class NameGeneratorComponent implements OnInit {
  @Input()
  generator: NameGenerator;
  generatedItems: string[];

  constructor() { }

  ngOnInit() {
    this.generate();
  }
  
  generate() {
    this.generateMultiple(10);
  }
  
  generateMultiple(count : number) {
    this.generatedItems = this.generator.generateMultiple(count);
  }

}
