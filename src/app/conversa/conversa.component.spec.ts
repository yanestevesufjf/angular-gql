import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversaComponent } from './conversa.component';

describe('ConversaComponent', () => {
  let component: ConversaComponent;
  let fixture: ComponentFixture<ConversaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
