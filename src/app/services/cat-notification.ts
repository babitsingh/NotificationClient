import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CatEventSummary {
  eventId: string;
  title: string;
  createdAt: string;
  htmlContent?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CatNotificationService {
  private hubConnection!: signalR.HubConnection;
  private notificationSubject = new BehaviorSubject<CatEventSummary | null>(null);
  private connectionStateSubject = new BehaviorSubject<boolean>(false);

  public notification$: Observable<CatEventSummary | null> = this.notificationSubject.asObservable();
  public isConnected$: Observable<boolean> = this.connectionStateSubject.asObservable();

  public startConnection(): void {
    // Connect to your running NotificationApi WebSocket hub URL
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5194/hubs/cat-notifications', {
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connected to NotificationApi!');
        this.connectionStateSubject.next(true);
      })
      .catch(err => {
        console.error('Error while establishing SignalR connection: ', err);
        this.connectionStateSubject.next(false);
      });

    this.hubConnection.onclose(() => {
      this.connectionStateSubject.next(false);
    });

    // Listen to the backend push method
    this.hubConnection.on('ReceiveCatNotification', (data: CatEventSummary) => {
      console.log('Received live cat event:', data);
      this.notificationSubject.next(data);
    });
  }

  public stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}