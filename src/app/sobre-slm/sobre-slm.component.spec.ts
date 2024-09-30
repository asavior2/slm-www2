import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreSLMComponent } from './sobre-slm.component';

describe('SobreSLMComponent', () => {
  let component: SobreSLMComponent;
  let fixture: ComponentFixture<SobreSLMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SobreSLMComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SobreSLMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
