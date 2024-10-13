import {Component, inject, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {DragDropModule} from 'primeng/dragdrop';
import {MenuModule} from 'primeng/menu';
import {SkeletonModule} from 'primeng/skeleton';

import {DemoStore} from '../../../../+state/demo/demo.store';
import {IssueSectionComponent} from '../issue-section/issue-section.component';

@Component({
  selector: 'app-issue-board',
  standalone: true,
  imports: [
    MenuModule,
    DragDropModule,
    IssueSectionComponent,
    SkeletonModule,
  ],
  templateUrl: './issue-board.component.html',
  styleUrl: './issue-board.component.scss',
})
export class IssueBoardComponent implements OnInit {
  items: MenuItem[] = [];
  protected readonly demoStore = inject(DemoStore);

  ngOnInit() {
    setTimeout(() => {
      this.demoStore.onLoadingComplete();
    }, 1500);
  }
}
