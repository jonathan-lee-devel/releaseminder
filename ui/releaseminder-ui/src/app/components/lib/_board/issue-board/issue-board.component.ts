import {Component, inject} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {DragDropModule} from 'primeng/dragdrop';
import {MenuModule} from 'primeng/menu';

import {DemoStore} from '../../../../+state/demo/demo.store';
import {IssueSectionComponent} from '../issue-section/issue-section.component';

@Component({
  selector: 'app-issue-board',
  standalone: true,
  imports: [
    MenuModule,
    DragDropModule,
    IssueSectionComponent,
  ],
  templateUrl: './issue-board.component.html',
  styleUrl: './issue-board.component.scss',
})
export class IssueBoardComponent {
  items: MenuItem[] = [];
  protected readonly demoStore = inject(DemoStore);
}
