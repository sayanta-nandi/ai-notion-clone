"use client";

import MarkDown from "react-markdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Y from "@/lib/yjsInstance";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, useState, useTransition } from "react";
import { BotIcon, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";

type Language =
  | "english"
  | "spanish"
  | "portuguese"
  | "french"
  | "german"
  | "chinese"
  | "arabic"
  | "hindi"
  | "russian"
  | "japanese"
  | "bengali";

const languages: Language[] = [
  "english",
  "spanish",
  "portuguese",
  "french",
  "german",
  "chinese",
  "arabic",
  "hindi",
  "russian",
  "japanese",
  "bengali",
];

function TranslateDocument({ doc }: { doc: Y.Doc }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState("");
  const [question, setQuestion] = useState("");
  const [summary, setSummary] = useState("");

  const [isPending, startTransition] = useTransition();
  const handleAskQuestion = (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();
      console.log(JSON.stringify(documentData));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentData,
            targetLang: language,
          }),
        }
      );

      if (res.ok) {
        const { translated_text } = await res.json();
        setSummary(translated_text);
        toast.success("Summary Translated Successfully");
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          <LanguagesIcon />
          Translate
        </DialogTrigger>
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex mx-auto">
            Translate the Document
          </DialogTitle>
          <DialogDescription className="text-center">
            Select a language and AI will translate the summary of the document
            in the selected language.
          </DialogDescription>
          <hr className="mt-5" />
          {question && <p className="mt-5 text-gray-500">Q: {question}</p>}
        </DialogHeader>
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
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select a Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
            <Button
              className="bg-green-600"
              type="submit"
              variant="default"
              disabled={!language || isPending}
            >
              {isPending ? "Translating..." : "Translate"}
            </Button>
          </Select>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default TranslateDocument;
