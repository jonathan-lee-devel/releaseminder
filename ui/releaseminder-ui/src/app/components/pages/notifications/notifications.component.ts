import {AsyncPipe, DatePipe, NgIf, NgOptimizedImage, NgStyle} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {MenuModule} from 'primeng/menu';

import {NotificationsStore} from '../../../+state/notifications/notifications.store';
import {rebaseRoutePath, RoutePath} from '../../../app.routes';
import {NotificationDto} from '../../../dtos/notifications/Notification.dto';
import {CardWithLinkComponent} from '../../lib/card-with-link/card-with-link.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    AsyncPipe,
    CardWithLinkComponent,
    NgIf,
    ButtonModule,
    DatePipe,
    NgOptimizedImage,
    MenuModule,
    NgStyle,
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'Acknowledge All Notifications',
      command: () => {
        this.acknowledgeAllNotificationsForUser();
      },
    },
    {
      label: 'Delete All Notifications',
      command: () => {
        this.promptDeleteAllNotificationsForUser();
      },
    },
  ];
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
  protected readonly notificationsStore = inject(NotificationsStore);
  protected readonly Date = Date;

  ngOnInit() {
    this.notificationsStore.loadNotifications();
  }

  protected createLinkFromNotification(notification: NotificationDto) {
    console.log(notification);
    return rebaseRoutePath(RoutePath.MAIN_MENU);
  }

  protected acknowledgeNotificationById(notificationId: string) {
    this.notificationsStore.acknowledgeNotificationById(notificationId);
  }

  protected deleteNotificationById(notificationId: string) {
    this.notificationsStore.deleteNotificationById(notificationId);
  }

  protected acknowledgeAllNotificationsForUser() {
    this.notificationsStore.acknowledgeAllNotificationsForUser();
  }

  protected promptDeleteAllNotificationsForUser() {
    this.notificationsStore.promptDeleteAllNotificationsForUser();
  }

  protected formatDateForCard(createdAtString: string) {
    return new Date(createdAtString).toLocaleDateString();
  }
}
