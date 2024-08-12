import React, { useState, useEffect, useRef } from "react";
import CenterModal from "@/components/modals/CenterModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FormField from "@/components/forms/FormField";
import TextField from "@/components/forms/TextField";
import FormSelect from "@/components/forms/FormSelect";
import { BroadcastSchema } from "@/schema";
import ButtonComponent from "@/components/ButtonComponent";
import AppIcon from "@/components/AppIcon";
import AppButton from "@/components/AppButton";
import FileUpload from "@/components/forms/FileUpload";
import { handleBroadcast } from "@/services/userservice";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { EmailTypes, NotifyTypes } from "@/constants";
import Image from "next/image";

interface FormData {
  type: string;
  notifyType: string;
  subject: string;
  body: string;
  banner?: any;
}

export default function Announcement() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [imgBanner, setImgBanner] = useState<any>("");
  const [formData, setFormData] = useState<FormData>({
    type: "",
    subject: "",
    body: "",
    notifyType: "email",
    banner: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<any>({
    resolver: yupResolver(BroadcastSchema),
    defaultValues: formData,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        type: "",
        subject: "",
        body: "",
        notifyType: "",
        banner: "",
      });
    }
  }, [isOpen]);

  const onSubmit = (data: FormData) => {
    setLoading(true);
    handleBroadcast(data)
      .then((res: any) => {
        if (res.status === 200) {
          toast.success(`Broadcast sent successfully!`);
          setLoading(false);
          setOpen(false);
        }
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const FILE: any = e?.target?.files?.[0];
    // const FILE_NAME = FILE.name;

    const allowedFileTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
    ];
    if (!allowedFileTypes.includes(FILE?.type)) {
      // Handle the case when the selected file type is not allowed

      toast.error("Only images (JPEG, PNG, GIF) and PDFs are allowed.");
      return;
    }
    if (FILE) {
      const base64 = await toBase64(FILE);
      // @ts-ignore
      setValue("banner", base64);
      setImgBanner(base64);
    }
  }

  const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div>
      <ButtonComponent
        onClick={() => setOpen(true)}
        className="!bg-white dark:!bg-gray-800 !text-secondary dark:!text-white !text-sm !border !border-[#C9C8C8] dark:!border-gray-600 md:hidden "
      >
        <span className="flex gap-x-2 items-center">
          <AppIcon icon="grommet-icons:announce" />
          <span className="hidden lg:inline">Broadcast</span>
        </span>
      </ButtonComponent>
      <AppButton
        text="Broadcast"
        icon="grommet-icons:announce"
        iconClass="text-sm"
        type="button"
        btnClass="!bg-primary !border-primary !text-white !hidden md:!flex"
        onClick={() => setOpen(true)}
      />

      <CenterModal setOpen={() => {}} open={isOpen}>
        <div className="bg-white dark:bg-gray-700 text-secondary dark:text-white p-6 rounded-lg sm:min-w-[500px] max-w-[600px]">
          <h2 className="font-semibold text-xl mb-10 text-center capitalize">
            Send Broadcast
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormSelect
                label={`Notification Type`}
                name="notifyType"
                placeholder="Select notification type"
                register={register}
                errors={errors?.notifyType}
                options={NotifyTypes} // Replace with actual options
                setValue={setValue}
                value={getValues().notifyType}
                trigger={trigger}
              />
              <FormSelect
                label={`Email Type`}
                name="type"
                placeholder="Select email type"
                register={register}
                errors={errors?.type}
                options={EmailTypes} // Replace with actual options
                setValue={setValue}
                trigger={trigger}
              />
            </div>

            <div className="mb-6">
              <FormField
                label={`Subject`}
                name="subject"
                placeholder=""
                register={register}
                errors={errors?.subject}
                icon={undefined}
              />
            </div>
            <div className="mb-6">
              <div className="mb-1">
                <FileUpload
                  handleUpload={handleFile}
                  title={imgBanner ? "Banner.png" : "Upload Broadcast banner"}
                >
                  <AppIcon icon="solar:upload-linear" />
                </FileUpload>
              </div>

              {imgBanner && (
                <Image
                  src={imgBanner}
                  alt="banner"
                  width={500}
                  height={10}
                  className="object-contain w-full h-16"
                />
              )}
            </div>

            <div>
              {getValues().notifyType === "email" ? (
                <>
                  <div className="block dark:hidden">
                    <Editor
                      body={getValues().body}
                      setBody={(data: any) => setValue("body", data)}
                    />
                  </div>
                  <div className="hidden dark:block dark_editor">
                    <Editor
                      body={getValues().body}
                      setBody={(data: any) => setValue("body", data)}
                    />
                  </div>
                </>
              ) : (
                <TextField
                  label={`Message`}
                  name="body"
                  placeholder=""
                  register={register}
                  errors={errors?.body}
                />
              )}
            </div>

            <div className="flex gap-x-5 items-center mt-10">
              <ButtonComponent
                onClick={() => setOpen(false)}
                className="w-full text-center !bg-transparent !border !border-gray-200 !text-secondary dark:!text-white/80 items-center"
                type="button"
                disabled={loading}
              >
                Cancel
              </ButtonComponent>
              <ButtonComponent
                className="w-full text-center !border !border-primary !bg-primary !text-white items-center"
                type="submit"
                isLoading={loading}
              >
                Submit
              </ButtonComponent>
            </div>
          </form>
        </div>
      </CenterModal>
    </div>
  );
}

function Editor({ body, setBody }: any) {
  // Solution-2 start
  const editorRef: any = useRef();
  const { CKEditor, ClassicEditor }: any = editorRef.current || {};
  // --- end
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function init() {
      // Solution-2
      /* eslint-disable global-require */
      const CKEditor = require("@ckeditor/ckeditor5-react");
      const ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
      /* eslint-enable global-require */
      editorRef.current = {
        CKEditor: CKEditor.CKEditor, // v3+
        ClassicEditor,
      };
      // --- end

      setLoaded(true);
    }
    init();
  }, []); // run on mounting

  if (loaded) {
    return (
      <CKEditor
        editor={ClassicEditor}
        data={body}
        height={350}
        onReady={(editor: any) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event: any, editor: any) => {
          // do something when editor's content changed
          const data = editor.getData();
          setBody(data);
          console.log({ event, editor, data });
        }}
      />
    );
  }
}
