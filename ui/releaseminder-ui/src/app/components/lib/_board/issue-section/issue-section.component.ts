import {NgIf} from '@angular/common';
import {Component, inject, input} from '@angular/core';
import {DragDropModule} from 'primeng/dragdrop';

import {DemoStore} from '../../../../+state/demo/demo.store';
import {IssueCardComponent} from '../issue-card/issue-card.component';

@Component({
  selector: 'app-issue-section',
  standalone: true,
  imports: [
    DragDropModule,
    IssueCardComponent,
    NgIf,
  ],
  templateUrl: './issue-section.component.html',
  styleUrl: './issue-section.component.scss',
})
export class IssueSectionComponent {
  cardTitle = input.required<string>();
  sectionId = input.required<string>();
  dueDate: Date = new Date();

  protected readonly demoStore = inject(DemoStore);

  createDate(dateIsoString: string) {
    return new Date(dateIsoString);
  }
}
