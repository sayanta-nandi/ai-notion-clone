"use client";

import Y from "@/lib/yjsInstance";
import { BotIcon, LanguagesIcon } from "lucide-react";
import { FormEvent, useState, useTransition } from "react";
import MarkDown from "react-markdown";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

function ChatToDocument({ doc }: { doc: Y.Doc }) {
  const [question, setQuestion] = useState("");
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [summary, setSummary] = useState("");
  const [isPending, startTransition] = useTransition();
  const handleAskQuestion = (e: FormEvent) => {
    e.preventDefault();
    setQuestion(input);
    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();
      console.log(doc.get("document-store").toJSON());
      console.log(input);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentData,
            question: input,
          }),
        }
      );

      if (res.ok) {
        const { message } = await res.json();
        setSummary(message);
        toast.success("Question asked Successfully");
      } else {
        toast.error("ai is busy");
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          <LanguagesIcon />
          Ask Question
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex mx-auto">
            Chat to the Document!
          </DialogTitle>
          <DialogDescription className="text-center">
            Ask a question and chat to the document with AI.
          </DialogDescription>
          <hr className="mt-5" />
        </DialogHeader>
        {question && <p className="mt-5 text-gray-500">Q: {question}</p>}
        {summary && (
          <div className="bg-gray-100 border border-gray-300 p-2 rounded-md flex flex-col gap-2 text-pretty">
            <div className="flex gap-2">
              <BotIcon />
              <p className="font-semibold">
                GPT {isPending ? "is thinking..." : "Says :"}
              </p>
            </div>
            <p>{isPending ? "Thinking..." : <MarkDown>{summary}</MarkDown>}</p>
          </div>
        )}
        <form
          className="flex justify-between gap-2"
          onSubmit={handleAskQuestion}
        >
          <Input
            type="text"
            placeholder="eg: What is this about?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="bg-green-600"
            type="submit"
            variant="default"
            disabled={!input || isPending}
          >
            {isPending ? "Asking..." : "Ask"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default ChatToDocument;
