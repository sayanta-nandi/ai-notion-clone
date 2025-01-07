import { db } from "@/firebase";
import { cn } from "@/lib/utils";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";

export default function SidebarOption({
  href,
  id,
  className,
}: {
  href: string;
  id: string;
  className?: string;
}) {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";
  if (!data) return null;
  return (
    <Link
      href={href}
      className={cn(
        `border p-2 rounded-md hover:bg-gray-300 ${
          isActive && "bg-gray-300 border-black"
        }`,
        className
      )}
    >
      <p className="text-center truncate">{data.title}</p>
    </Link>
  );
}
