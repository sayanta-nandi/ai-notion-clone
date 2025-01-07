"use client";

import { MenuIcon } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";
import NewDocumentButton from "./NewDocumentButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@clerk/nextjs";
import {
  collectionGroup,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import SidebarOption from "./SidebarOption";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "editor" | "owner";
  roomId: string;
  userId: string;
}

function Sidebar() {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });
  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );

  useEffect(() => {
    if (!data) return;
    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          });
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData,
          });
        }
        return acc;
      },
      { owner: [], editor: [] }
    );

    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <>
      <NewDocumentButton className="mb-4" />
      <div className="w-full mb-4">
        {/* My Documents */}
        {groupedData.owner.length === 0 ? (
          <h2>No Document Found</h2>
        ) : (
          <div className="flex flex-col space-y-2">
            <h2 className="text-center text-zinc-500">My Documents</h2>
            <div className="flex flex-col space-y-2">
              {groupedData.owner.map((doc) => {
                console.log(doc);
                return (
                  <SidebarOption
                    className=""
                    href={`/doc/${doc.id}`}
                    id={doc.id}
                    key={doc.id}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* lists */}

      {/* Shared with me */}
      {groupedData.editor.length > 0 && (
        <div className="flex flex-col space-y-2 w-full">
          <h2 className="text-center text-zinc-500">Shared with me</h2>
          <div className="flex flex-col space-y-2">
            {groupedData.editor.map((doc) => {
              console.log(doc);
              return (
                <SidebarOption
                  className=""
                  href={`/doc/${doc.id}`}
                  id={doc.id}
                  key={doc.id}
                />
              );
            })}
          </div>
        </div>
      )}
      {/* List... */}
    </>
  );
  return (
    <div className="relative p-2 md:p-5 bg-gray-100">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon
              className="p-2 md:p-5 hover:opacity-30 rounded-lg"
              size={40}
            />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="flex flex-col items-center">
              <SheetTitle></SheetTitle>
              <div className="min-w-full flex flex-col items-center">
                {menuOptions}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
}
export default Sidebar;
