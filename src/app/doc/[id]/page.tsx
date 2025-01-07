"use client";

import Document from "@/components/Document";
import { useParams } from "next/navigation";

function DocumentPage() {
  const { id } = useParams();
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  );
}
export default DocumentPage;
