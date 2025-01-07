"use client";

import { deleteDocument } from "@/actions/actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

function DeleteDocument() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const pathName = usePathname();
  const router = useRouter();

  const handleDelete = async () => {
    const roomId = pathName.split("/").pop();
    if (!roomId) return;
    startTransition(async () => {
      const { success } = await deleteDocument(roomId);

      if (success) {
        setIsOpen(false);
        router.replace("/");
        toast.success("Document has been deleted.");
      } else {
        toast.error("Failed to delete document.");
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="destructive">
        <DialogTrigger>Delete</DialogTrigger>
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex mx-auto">
            Are you sure you want to delete?
          </DialogTitle>
          <DialogDescription className="text-center">
            This will delete the document and all its contents, removing all the
            users from the document permanently.
          </DialogDescription>
          <DialogFooter className="mx-auto pt-2">
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
export default DeleteDocument;
