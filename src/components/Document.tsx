"use client";

import { db } from "@/firebase";
import useOwner from "@/lib/useOwner";
import { doc, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import DeleteDocument from "./DeleteDocument";
import Editor from "./Editor";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import Avaters from "./Avaters";

function Document({ id }: { id: any }) {
  const [data] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isUpadting, startTransition] = useTransition();
  const isOwner = useOwner();
  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);
  const updateTitle = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };
  return (
    <div className="relative flex-1 bg-slate-50 h-full p-2 md:p-5 rounded-md">
      <div className="flex max-w-5xl mx-auto justify-between p-2 md:p-5">
        <form
          onSubmit={updateTitle}
          className="flex flex-1 items-center space-x-2"
        >
          {/* update title */}
          <Input
            className="bg-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button disabled={isUpadting}>
            {isUpadting ? "Updating..." : "Update"}
          </Button>
          {/* if owner then invite userflow delete doc*/}
          {isOwner && (
            <>
              {/* invite */}
              <InviteUser />
              {/* delete */}
              <DeleteDocument />
            </>
          )}
        </form>
      </div>
      <div className="p-2 md:p-5 flex max-w-5xl mx-auto justify-between items-center">
        {/* Manage user */}
        <ManageUsers />
        {/* Avater */}
        <Avaters />
      </div>
      <hr className="pb-10" />
      {/* collebarative editor */}
      <Editor />
    </div>
  );
}
export default Document;
