"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createNewDocument } from "../actions/actions";

function NewDocumentButton({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleCreateNewDocument = () => {
    startTransition(async () => {
      // Create a new document
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`);
    });
  };
  return (
    <Button
      onClick={handleCreateNewDocument}
      disabled={isPending}
      className={className}
    >
      {isPending ? "Creating..." : "New Document"}
    </Button>
  );
}
export default NewDocumentButton;
