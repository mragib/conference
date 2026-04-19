"use client";

import {
  boldExtension,
  createEditorSystem,
  historyExtension,
  italicExtension,
  linkExtension,
  listExtension,
  RichText,
} from "@lexkit/editor";

// 1. Define your extensions (for features like bold, lists, etc)
const extensions = [
  boldExtension,
  italicExtension,
  listExtension,
  linkExtension,
  historyExtension,
] as const;

// 2. Create typed editor system
const { Provider, useEditor } = createEditorSystem<typeof extensions>();

function Toolbar() {
  const { commands, activeStates } = useEditor();

  return (
    <div className="basic-toolbar">
      <button
        onClick={() => commands.toggleBold()}
        className={activeStates.bold ? "active" : ""}
      >
        Bold
      </button>
      <button
        onClick={() => commands.toggleItalic()}
        className={activeStates.italic ? "active" : ""}
      >
        Italic
      </button>
      <button onClick={() => commands.toggleUnorderedList()}>• List</button>
      <button onClick={() => commands.toggleOrderedList()}>1. List</button>
      <button onClick={() => commands.undo()} disabled={!activeStates.canUndo}>
        Undo
      </button>
      <button onClick={() => commands.redo()} disabled={!activeStates.canRedo}>
        Redo
      </button>
    </div>
  );
}

function Editor() {
  return (
    <div className="basic-editor">
      <Toolbar />
      <RichText
        placeholder="Start writing your content here..."
        classNames={{
          container: "basic-editor-container",
          contentEditable: "basic-content",
          placeholder: "basic-placeholder",
        }}
      />
    </div>
  );
}

export function RichEditor() {
  return (
    <Provider extensions={extensions}>
      <Editor />
    </Provider>
  );
}
