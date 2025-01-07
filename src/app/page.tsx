import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex space-x-2 items-center animate-pulse">
      <ArrowLeftCircle className="size-10" />
      <h1 className="font-semibold text-2xl">
        Get started with creating a New Document
      </h1>
    </div>
  );
}
