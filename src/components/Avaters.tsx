"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { ArrowRight } from "lucide-react";

function Avaters() {
  const self = useSelf();
  const others = useOthers();
  const all = [self, ...others];

  return (
    <div className="flex items-center gap-2">
      <p className="flex">
        🔴Live users ({all.length}) <ArrowRight />
      </p>
      <div className="flex -space-x-4">
        {all.map((other, i) => (
          <TooltipProvider key={other?.id + i}>
            <Tooltip>
              <TooltipTrigger>
                <Avatar className="hover:z-40 hover:scale-110 transition-all ring-2 ring-white">
                  <AvatarImage src={other?.info.avatar} />
                  <AvatarFallback>{other?.info.name}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{self?.id === other?.id ? "You" : other?.info.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
export default Avaters;
