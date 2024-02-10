import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiderSearchComponent } from './wider-search.component';

describe('WiderSearchComponent', () => {
  let component: WiderSearchComponent;
  let fixture: ComponentFixture<WiderSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WiderSearchComponent]
    });
    fixture = TestBed.createComponent(WiderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
