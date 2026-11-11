import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatEventUpdatesFeed } from './cat-event-updates-feed';

describe('CatEventUpdatesFeed', () => {
  let component: CatEventUpdatesFeed;
  let fixture: ComponentFixture<CatEventUpdatesFeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatEventUpdatesFeed],
    }).compileComponents();

    fixture = TestBed.createComponent(CatEventUpdatesFeed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
