"use client";

import { getWordCount } from "@/lib/utils";
import { $generateHtmlFromNodes } from "@lexical/html";
import {
  boldExtension,
  createEditorSystem,
  historyExtension,
  italicExtension,
  linkExtension,
  listExtension,
  RichText,
} from "@lexkit/editor";
import { $getRoot } from "lexical";
import { Bold, Italic, Redo, Undo } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const extensions = [
  boldExtension,
  italicExtension,
  listExtension,
  linkExtension,
  historyExtension,
] as const;

const { Provider, useEditor } = createEditorSystem<typeof extensions>();

function Toolbar() {
  const { commands, activeStates, editor } = useEditor();

  const baseBtn = "p-2 rounded-lg transition hover:bg-gray-100 text-gray-700";
  const activeBtn = "bg-gray-900 text-white hover:bg-gray-800";

  return (
    <div className="sticky top-0 z-10 flex items-center gap-1 p-2 border-b bg-white/80 backdrop-blur">
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          editor?.focus?.();
          commands.toggleBold();
        }}
        className={`${baseBtn} ${activeStates.bold ? activeBtn : ""}`}
      >
        <Bold size={16} />
      </button>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          editor?.focus?.();
          commands.toggleItalic();
        }}
        className={`${baseBtn} ${activeStates.italic ? activeBtn : ""}`}
      >
        <Italic size={16} />
      </button>

      <div className="ml-auto flex gap-1">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => commands.undo()}
          disabled={!activeStates.canUndo}
          className={`${baseBtn} disabled:opacity-40`}
        >
          <Undo size={16} />
        </button>

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => commands.redo()}
          disabled={!activeStates.canRedo}
          className={`${baseBtn} disabled:opacity-40`}
        >
          <Redo size={16} />
        </button>
      </div>
    </div>
  );
}

function Editor({ value, onChange, PLACEHOLDER }: any) {
  const { editor } = useEditor();
  const lastRef = useRef("");
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (!editor) return;

    const isFirstRun = { current: true };

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const html = $generateHtmlFromNodes(editor, null);
        const text = editorState.read(() => $getRoot().getTextContent());

        const words = getWordCount(text);

        setWordCount(words);

        if (isFirstRun.current) {
          isFirstRun.current = false;
          lastRef.current = html;
          return;
        }

        if (!text.trim()) {
          return;
        }

        if (html === lastRef.current) {
          return;
        }

        lastRef.current = html;
        onChange(html);
      });
    });
  }, [editor]);

  return (
    <div className="max-w-3xl mx-auto border rounded-2xl shadow-sm bg-white overflow-hidden">
      <Toolbar />

      <RichText
        placeholder={PLACEHOLDER}
        classNames={{
          container: "p-2",
          contentEditable:
            "min-h-[70px] outline-none text-gray-800 text-[15px] leading-relaxed",
          placeholder: "text-gray-400 p-2",
        }}
      />
      <div className="flex justify-between text-sm mt-2 p-2">
        <p className={"text-gray-500"}>Words: {wordCount}</p>
      </div>
    </div>
  );
}
export function RichEditor({ value, onChange, PLACEHOLDER }: any) {
  return (
    <Provider extensions={extensions}>
      <Editor value={value} onChange={onChange} PLACEHOLDER={PLACEHOLDER} />
    </Provider>
  );
}
