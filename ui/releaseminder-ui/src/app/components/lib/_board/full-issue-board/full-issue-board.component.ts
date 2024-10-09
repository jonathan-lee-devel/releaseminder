import {NgClass} from '@angular/common';
import {Component, inject} from '@angular/core';

import {DemoStore} from '../../../../+state/demo/demo.store';
import {IssueBoardComponent} from '../issue-board/issue-board.component';

@Component({
  selector: 'app-full-issue-board',
  standalone: true,
  imports: [
    IssueBoardComponent,
    NgClass,
  ],
  templateUrl: './full-issue-board.component.html',
  styleUrl: './full-issue-board.component.scss',
})
export class FullIssueBoardComponent {
  activeAssignee: number = 0;

  protected readonly demoStore = inject(DemoStore);

  updateActiveAssignee(index: number, assignee: string) {
    this.activeAssignee = index;
    this.demoStore.updateVisibilityOnAssigneeUpdate(assignee);
  }
}
