import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';

import {IssueDto} from '../../dtos/issues/Issue.dto';
import {IssueSectionDto} from '../../dtos/issues/IssueSection.dto';

type DemoState = {
  currentlyDraggedIssue: IssueDto | null;
  currentlyDraggedIssueStartingSectionId: string | null;
  sections: IssueSectionDto[];
}

const initialState: DemoState = {
  currentlyDraggedIssue: null,
  currentlyDraggedIssueStartingSectionId: null,
  sections: [
    {
      id: '1',
      title: 'To-Do',
      issues: [
        {
          id: '1',
          title: 'Text overlapping',
          iconClass: 'pi-times-circle',
          type: 'BUG',
          assignee: 'Jonathan',
          color: 'pink',
          dueDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Add secrets',
          iconClass: 'pi-thumbs-up',
          type: 'STORY',
          assignee: 'Jonathan',
          color: 'green',
          dueDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'In Progress',
      issues: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Ready for QA',
      issues: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Ready for Release',
      issues: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

export const DemoStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store) => {
      return {
        addIssue: (sectionId: string, issue: IssueDto) => {
          const section = store.sections().find((section) => section.id === sectionId);
          if (!section) {
            return;
          }
          section.issues.push(issue);
          const newSections = [...store.sections().filter((section) => section.id !== sectionId)];
          newSections.push(section);
          patchState(store, {sections: [...newSections]});
        },
        getSectionById: (sectionId: string) => {
          return store.sections().find((section) => section.id === sectionId);
        },
        handleDragStart: (issue: IssueDto, sectionId: string) => {
          patchState(store, {currentlyDraggedIssue: issue, currentlyDraggedIssueStartingSectionId: sectionId});
        },
        handleDrop: (sectionId: string) => {
          const currentlyDraggedIssue = store.currentlyDraggedIssue();
          const currentlyDraggedIssueStartingSectionId = store.currentlyDraggedIssueStartingSectionId();
          if (!currentlyDraggedIssue || !currentlyDraggedIssueStartingSectionId) {
            return;
          }
          const targetSection = store.sections().find((section) => section.id === sectionId);
          if (!targetSection) {
            return;
          }
          const startingSection = store.sections().find((section) => section.id === store.currentlyDraggedIssueStartingSectionId());
          if (!startingSection) {
            return;
          }
          startingSection.issues = [...startingSection.issues.filter((issue) => issue.id !== currentlyDraggedIssue.id)];
          targetSection.issues.push(currentlyDraggedIssue);
          const newSections = [...store.sections()
              .filter((section) => section.id !== startingSection.id)
              .filter((section) => section.id !== targetSection.id),
          ];
          newSections.push(startingSection);
          newSections.push(targetSection);
          patchState(store, {currentlyDraggedIssue: null, currentlyDraggedIssueStartingSectionId: null, sections: newSections});
        },
      };
    }),
);
