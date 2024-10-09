import {NgClass} from '@angular/common';
import {Component, inject, input} from '@angular/core';
import {DragDropModule} from 'primeng/dragdrop';

import {DemoStore} from '../../../../+state/demo/demo.store';

@Component({
  selector: 'app-issue-card',
  standalone: true,
  imports: [
    DragDropModule,
    NgClass,
  ],
  templateUrl: './issue-card.component.html',
  styleUrl: './issue-card.component.scss',
})
export class IssueCardComponent {
  colorName = input.required<string>();
  title = input.required<string>();
  iconClass = input.required<string>();
  issueType = input.required<string>();
  assignee = input.required<string>();
  dueDate = input.required<Date>();
  protected demoStore = inject(DemoStore);
}
