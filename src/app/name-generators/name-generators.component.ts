import { Component, OnInit } from '@angular/core';

import { NameGenerator } from '../name-generator/name-generator';
import { NameGeneratorsService, NameGeneratorFront } from '../name-generators.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-name-generators',
  templateUrl: './name-generators.component.html',
  styleUrls: ['./name-generators.component.css']
})
export class NameGeneratorsComponent implements OnInit {

  availableGenerators : NameGeneratorFront[] = [];
  selectedGenerator: NameGenerator;

  constructor(private nameGeneratorsService: NameGeneratorsService) { }

  ngOnInit() {
    Observable.zip(
      this.nameGeneratorsService.getAvailableGenerators()
        .flatMap(availableGenerators => Observable.from(availableGenerators)),
      Observable.timer(0, 0),
      value => value
    )
      .subscribe(
        availableGenerator => this.availableGenerators.push(availableGenerator),
        error => {},
        () => {}
      );
  }

  onGeneratorSelected(id : string) {
    this.nameGeneratorsService.getGenerator(id)
      .subscribe(
        generator => this.selectedGenerator = generator,
        error => {},
        () => {}
      );
  }

}
