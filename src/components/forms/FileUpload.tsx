import { ReactNode, useRef } from "react";

type FileUploadProps = {
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>, id?: string, values?: any) => void;
  title?: string;
  id?: string;
  values?: any;
};

const FileUpload = ({
  accept,
  multiple,
  children,
  handleUpload,
  title,
  id,
  values,
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => inputRef.current?.click();

  return (
    <div
      className="py-[10px] px-[14px] input rounded-lg border border-gray-300 cursor-pointer flex items-center gap-3"
      onClick={handleClick}
    >
      <input
        type="file"
        multiple={multiple || false}
        hidden
        accept={accept}
        onChange={(e) => handleUpload(e, id, values)}
        name={id}
        ref={(e) => {
          inputRef.current = e;
        }}
        className="hidden"
      />
      {children}
      <span className="text-sm text-gray-700 dark:text-white/70 truncate" style={{ maxWidth: "200px" }}>
        {title || (
          <span className="text-lightdarkGrey50">No document chosen</span>
        )}
      </span>
    </div>
  );
};

export default FileUpload;
