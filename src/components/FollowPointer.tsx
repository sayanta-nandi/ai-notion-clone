import stringtoColor from "@/lib/stringtoColor";
import { motion } from "framer-motion";

function FollowPointer({
  x,
  y,
  info,
}: {
  x: number;
  y: number;
  info: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const color = stringtoColor(info.email || "1");
  console.log(color);
  return (
    <motion.div
      className="size-4 rounded-full absolute z-50"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
        position: "absolute",
      }}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <svg
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>
      <motion.div
        style={{
          backgroundColor: color,
        }}
        className={`m-2 p-2 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full`}
      >
        {info.name || info.email}
      </motion.div>
    </motion.div>
  );
}
export default FollowPointer;
