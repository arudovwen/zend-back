import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {
  return (
    <div
      data-testid="pre-loader"
      className="flex w-full h-full items-center justify-center py-48"
    >
      <span>
        <AiOutlineLoading className="text-[60px] animate-spin text-primary" />
      </span>
    </div>
  );
}
