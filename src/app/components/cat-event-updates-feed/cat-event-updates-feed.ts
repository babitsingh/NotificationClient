import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CatNotificationService, CatEventSummary } from '../../services/cat-notification';

export interface DisplayCatEvent extends CatEventSummary {
  safeHtmlContent?: SafeHtml;
}

@Component({
  selector: 'app-cat-event-updates-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cat-event-updates-feed.html',
  styleUrls: ['./cat-event-updates-feed.css']
})
export class CatEventUpdatesFeedComponent implements OnInit, OnDestroy {
  notifications: DisplayCatEvent[] = [];
  isOnline = false;
  private subs = new Subscription();

  constructor(
    private notificationService: CatNotificationService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.notificationService.startConnection();

    this.subs.add(
      this.notificationService.isConnected$.subscribe(status => this.isOnline = status)
    );

    this.subs.add(
      this.notificationService.notification$.subscribe((event: any) => {
        if (event) {
          const richHtml = event.htmlContent || `<p><strong>${event.title}</strong> - Live update broadcasted successfully.</p>`;
          
          const decoratedEvent: DisplayCatEvent = {
            ...event,
            safeHtmlContent: this.sanitizer.bypassSecurityTrustHtml(richHtml)
          };

          this.notifications.push(decoratedEvent);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.notificationService.stopConnection();
  }
}