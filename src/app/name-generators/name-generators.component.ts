import { Component, OnInit } from '@angular/core';

import { NameGenerator } from '../name-generator/name-generator';
import { NameGeneratorsService } from '../name-generators.service';

@Component({
  selector: 'app-name-generators',
  templateUrl: './name-generators.component.html',
  styleUrls: ['./name-generators.component.css']
})
export class NameGeneratorsComponent implements OnInit {
  selectedGenerator: NameGenerator;

  constructor(private nameGeneratorsService: NameGeneratorsService) { }

  ngOnInit() {
    this.nameGeneratorsService.getGenerator("human-name-basic")
      .subscribe(generator => this.selectedGenerator = generator);
  }

}
