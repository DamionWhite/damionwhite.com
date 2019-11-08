import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseLogComponent } from './release-log.component';

describe('ReleaseLogComponent', () => {
  let component: ReleaseLogComponent;
  let fixture: ComponentFixture<ReleaseLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
