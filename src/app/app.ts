import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatEventUpdatesFeedComponent } from './components/cat-event-updates-feed/cat-event-updates-feed';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CatEventUpdatesFeedComponent],
  template: `<app-cat-event-updates-feed></app-cat-event-updates-feed>`
})
export class AppComponent {}