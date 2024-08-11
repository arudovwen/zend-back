import React from "react";
import CenterModal from "./modals/CenterModal";
import Image from "next/image";
import PDFViewer from "@/components/PdfViewer";
import Loader from "@/components/Loader";

export default function MediaViewer({
  setOpen,
  isOpen,
  type,
  file,
  fileName,
  onClose,
}: any) {
  const [loading, setLoading] = React.useState(true);

  return (
    <CenterModal setOpen={() => setOpen(false)} open={isOpen} canClose>
      <div className="w-[80vw] h-[70vh] overflow-auto rounded-lg flex flex-col justify-center items-center">
        {type == "pdf" ? (
          <div className="h-full overflow-auto">
            {" "}
            <PDFViewer pdf={file} />
          </div>
        ) : (
          <div>
            <div>
              {loading && (
                <Loader />
              ) }
                <Image
                  width={800}
                  height={800}
                  className={`w-[800px] h-auto object-contain ${loading && "invisible"}`}
                  src={file}
                  alt="file"
                  onLoad={() => setLoading(false)}
                
                />
              
            </div>
          </div>
        )}
      </div>
    </CenterModal>
  );
}
