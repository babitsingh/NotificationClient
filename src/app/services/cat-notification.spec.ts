import { TestBed } from '@angular/core/testing';
import { CatNotification } from './cat-notification';

describe('CatNotification', () => {
  let service: CatNotification;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatNotification);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
