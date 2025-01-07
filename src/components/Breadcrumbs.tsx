"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

function Breadcrumbs() {
  const path = usePathname();
  const segments = path.split("/");
  console.log(segments[1]);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => {
          if (segment === "") {
            return null;
          }
          const href = segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;
          return (
            <BreadcrumbItem key={segment}>
              <BreadcrumbSeparator></BreadcrumbSeparator>
              {isLast ? (
                <BreadcrumbPage>{segment}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
export default Breadcrumbs;
