"use client";

import RoomProvider from "@/components/RoomProvider";
import { usePathname } from "next/navigation";

function DocLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const id = path.split("/").pop() || "none";
  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}
export default DocLayout;
