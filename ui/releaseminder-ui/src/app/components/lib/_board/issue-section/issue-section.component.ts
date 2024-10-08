import {Component, input} from '@angular/core';
import {DragDropModule} from 'primeng/dragdrop';

import {IssueCardComponent} from '../issue-card/issue-card.component';

@Component({
  selector: 'app-issue-section',
  standalone: true,
  imports: [
    DragDropModule,
    IssueCardComponent,
  ],
  templateUrl: './issue-section.component.html',
  styleUrl: './issue-section.component.scss',
})
export class IssueSectionComponent {
  cardTitle = input.required<string>();
}
