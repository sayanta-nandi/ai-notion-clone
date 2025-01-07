"use client";

import { inviteUserToDoc } from "@/actions/actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePathname } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function InviteUser() {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const pathName = usePathname();

  const handleInvite = async (e: FormEvent) => {
    e.preventDefault();

    const roomId = pathName.split("/").pop();
    if (!roomId) return;
    startTransition(async () => {
      const { success } = await inviteUserToDoc(roomId, email);

      if (success) {
        setIsOpen(false);
        setEmail("");

        toast.success("User added to room successfully!");
      } else {
        toast.error("Failed to add user to the room!");
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>Invite</DialogTrigger>
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex mx-auto">
            Invite a User to collaborate!
          </DialogTitle>
          <DialogDescription className="text-center">
            Enter the email of the user you want to invite.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleInvite}>
          <Input
            type="email"
            placeholder="Email"
            className="w-full mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="w-full flex justify-center gap-5">
            <Button
              className="bg-green-600"
              type="submit"
              variant="default"
              disabled={!email || isPending}
            >
              {isPending ? "Inviting..." : "Invite"}
            </Button>
            <DialogClose asChild>
              <Button
                className="hover:bg-gray-200"
                type="button"
                variant="secondary"
                onClick={() => setEmail("")}
              >
                Close
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default InviteUser;
