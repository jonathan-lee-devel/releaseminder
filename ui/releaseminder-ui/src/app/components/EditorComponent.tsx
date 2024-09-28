"use client";

import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  diffSourcePlugin,
  toolbarPlugin,
  DiffSourceToggleWrapper,
  UndoRedo,
  BoldItalicUnderlineToggles, CodeToggle, InsertImage, InsertTable
} from "@mdxeditor/editor";
import { FC } from "react";

interface EditorProps {
  markdown: string;
  diffMarkdown: string;
  isReadOnly: boolean;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const Editor: FC<EditorProps> = ({ markdown, diffMarkdown, editorRef, isReadOnly }) => {
  return (
    <MDXEditor
      className={'max-w-screen-2xl min-w-full'}
      onChange={(e) => console.log(e)}
      ref={editorRef}
      markdown={markdown}
      readOnly={isReadOnly}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        diffSourcePlugin({ diffMarkdown, viewMode: 'rich-text'}),
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <InsertImage />
              <InsertTable />
            </DiffSourceToggleWrapper>
          )
        })
      ]}
    />
  );
};

export default Editor;
