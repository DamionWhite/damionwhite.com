import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLogComponent } from './changelog.component';

describe('ReleaseLogComponent', () => {
  let component: ChangeLogComponent;
  let fixture: ComponentFixture<ChangeLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
