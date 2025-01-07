"use client";

import stringtoColor from "@/lib/stringtoColor";
import Y from "@/lib/yjsInstance";
import { BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ChatToDocument from "./ChatToDocument";
import TranslateDocument from "./TranslateDocument";
import { Button } from "./ui/button";

type BlockNoteProps = {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
  darkMode: boolean;
};

console.log("roni");

function BlockNote({ doc, provider, darkMode }: BlockNoteProps) {
  const userInfo = useSelf((me) => me.info);
  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: userInfo?.name,
        color: stringtoColor(userInfo.email),
      },
    },
  });
  return (
    <BlockNoteView
      className="relative max-w-5xl mx-auto min-h-screen rounded-md bg-white p-2 md:p-5"
      editor={editor}
      theme={darkMode ? "dark" : "light"}
    />
  );
}

function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState<boolean>(false);
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) return null;

  return (
    <div className="max-w-5xl mx-auto p-2 md:p-5">
      <div className={`flex items-center gap-2 justify-end mb-10`}>
        {/* transalte */}
        <TranslateDocument doc={doc} />
        {/* chat */}
        <ChatToDocument doc={doc} />

        {/* dark mode */}
        <Button
          className={`${
            darkMode
              ? "text-gray-200 bg-gray-700 hover:bg-gray-500"
              : "text-gray-700 bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
      {/* blocknotes */}
      <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
    </div>
  );
}
export default Editor;
