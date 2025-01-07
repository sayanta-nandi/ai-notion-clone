import LiveBlocksProvider from "@/components/LiveblocksProvider";
import { auth } from "@clerk/nextjs/server";
import { ReactNode, Suspense } from "react";

function PageLayout({ children }: { children: ReactNode }) {
  auth.protect();
  return (
    <LiveBlocksProvider>
      <Suspense>{children}</Suspense>
    </LiveBlocksProvider>
  );
}
export default PageLayout;
