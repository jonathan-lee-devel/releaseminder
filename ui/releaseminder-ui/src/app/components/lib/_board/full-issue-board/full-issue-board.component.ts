import {NgClass} from '@angular/common';
import {Component} from '@angular/core';

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
}
