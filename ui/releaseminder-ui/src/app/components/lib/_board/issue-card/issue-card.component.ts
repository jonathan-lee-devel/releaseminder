import {NgClass} from '@angular/common';
import {Component, input} from '@angular/core';
import {DragDropModule} from 'primeng/dragdrop';

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
}
