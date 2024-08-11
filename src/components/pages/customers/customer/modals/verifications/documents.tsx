import React, { useState } from "react";
import MediaViewer from "@/components/MediaViewer";
import InfoDisplay from "@/components/InfoDisplay";

async function downloadUsingFetch(file: string) {
  const image = await fetch(file);

  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const anchor = document.createElement("a");
  anchor.href = imageURL;
  anchor.download = "document";

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(imageURL);
}

function GovtDetail({ detail }: any) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");

  function handlePreview(val: any) {
    setFile(val);
    setOpen(true);
  }

  function handleModalClose() {
    setOpen(false);
  }

  function renderDocuments(
    documents: any[],
    label:
      | string
      | number
      | bigint
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | Promise<React.AwaitedReactNode>
      | null
      | undefined
  ) {
    return documents.map((item, idx) => (
      <div
        key={item}
        className="p-4  rounded-lg flex justify-between items-center text-sm bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-600"
      >
        <div>
          <p className="text-secondary/80 dark:text-white/80 capitalize">
            {label} {idx + 1}
          </p>
        </div>
        <div className="flex gap-x-4">
          <button
            type="button"
            className="text-primary dark:text-white/80 capitalize"
            onClick={() => downloadUsingFetch(item)}
          >
            Download
          </button>
          <button
            type="button"
            className="text-primary dark:text-white/80 capitalize"
            onClick={() => handlePreview(item)}
          >
            View
          </button>
        </div>
      </div>
    ));
  }

  const data = [
    {
      label: "Phone number",
      key: "phone",
    },
    {
      label: "Email address",
      key: "emailAddress",
    },
    {
      label: "BVN",
      key: "bvn",
    },
  ];
  return (
    <div className="">
      <div className="grid">
        <div>
          <h3 className="text-base font-semibold text-secondary dark:text-white/80 capitalize mb-4">
            {detail?.type} data{" "}
            {detail?.type2 && `(${detail?.type2.replace("_", "  ")})`}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-y-1">
          {data?.map((i, index) => (
            <div key={i.label}>
              <InfoDisplay info={i} data={detail} />
            </div>
          ))}
        </div>
        {detail?.images?.length > 0 && (
          <div className="grid gap-y-1">
            {renderDocuments(detail?.images, "IMAGE")}
          </div>
        )}

        {detail?.documents?.length > 0 && (
          <div className="grid gap-y-1">
            {renderDocuments(detail?.documents, "DOCUMENT")}
          </div>
        )}

        {detail?.verificationImages?.length > 0 && (
          <div className="grid mb-10">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Personal Data
              </h3>
            </div>
            <div className="grid gap-y-1">
              {renderDocuments(detail?.verificationImages, "DOCUMENT")}
            </div>
          </div>
        )}
      </div>
      {open && (
        <MediaViewer
          isOpen={open}
          onClose={handleModalClose}
          file={file}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}

export default GovtDetail;
