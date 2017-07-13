import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameGeneratorsComponent } from './name-generators.component';

describe('NameGeneratorsComponent', () => {
  let component: NameGeneratorsComponent;
  let fixture: ComponentFixture<NameGeneratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameGeneratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameGeneratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
