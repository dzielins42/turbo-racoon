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
  generated: string;

  constructor() { }

  ngOnInit() {
    this.generated = this.generator.generate();
  }

}
