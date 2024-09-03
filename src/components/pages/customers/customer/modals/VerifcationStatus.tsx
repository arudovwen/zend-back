import React, { useState, useEffect, useContext } from "react";
import CenterModal from "@/components/modals/CenterModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import TextField from "@/components/forms/TextField";
import { VerificationSchema } from "@/schema";
import ButtonComponent from "@/components/ButtonComponent";
import InfoDisplay from "@/components/InfoDisplay";
import { updateVerificationRequest } from "@/services/userservice";
import { ucFirst } from "@/utils/methods";
import Documents from "./verifications/documents";
import moment from "moment";
import AppStatusComponent from "@/components/AppStatusComponent";
import { PageContext } from "@/constants/context";

interface FormData {
  reason?: any;
  id?: any;
  type?: any;
  action?: any;
}

interface VerificationStatusProps {
  setOpen: (open: boolean) => void;
  isOpen: boolean;
  detail?: any;
  onClose?: any;
}

const VerificationStatus: React.FC<VerificationStatusProps> = ({
  setOpen,
  isOpen,
  detail,
  onClose,
}: any) => {
  const { permissions } = useContext(PageContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [detailData, setDetailData] = useState<any>(null);
  const [formData] = useState<FormData>({
    reason: "",
    id: detail?._id || detail?.id,
    type: "approve",
    action: "",
  });
  const [isRejectOpen, setRejectOpen] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(VerificationSchema),
    defaultValues: formData, // Use defaultValues instead of initialValue
  });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    updateVerificationRequest({ ...data, action: data.type })
      .then((res: any) => {
        if (res.status === 200) {
          toast.success(`Request submitted successfully!`);
          setLoading(false);
          onClose && onClose();
          setOpen(false); // Example of closing modal after successful submission
        }
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err?.response?.data?.message || "Process failed");
      });
  };
  const data = [
    {
      label: "Full name",
      key: "name",
    },
    {
      label: "Email address",
      key: "email",
    },
    {
      label: "Country",
      key: "country",
    },
    {
      label: "Type",
      key: "type",
    },
    {
      label: "Submitted",
      key: "submitted",
    },
    {
      label: "Approved",
      key: "approved",
    },
    {
      label: "Status",
      key: "status",
    },
  ];

  useEffect(() => {
    setDetailData({
      ...detail,
      type: ucFirst(detail?.type),
      country: ucFirst(detail?.country),
      submitted: moment(detail?.createdAt).format("lll"),
      approved: moment(detail?.approvedAt).format("lll"),
      status: (
        <AppStatusComponent
          status={detail?.isApproved ? "approved" : "pending"}
        />
      ),
    });
  }, [detail]);

  return (
    <CenterModal setOpen={() => setOpen(false)} open={isOpen} canClose>
      <div className="bg-white dark:bg-gray-800 text-secondary dark:text-white py-8 px-8 rounded-lg min-w-[600px]">
        <h2 className="font-semibold text-xl mb-2 text-center capitalize">
          {detail?.type} verification
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid grid-cols-1 gap-y-1 mb-6">
            {data?.map((i, index) => (
              <div key={i.label}>
                <InfoDisplay info={i} data={detailData} />
              </div>
            ))}
          </div>
          <div>
            <Documents detail={detail} />
          </div>

          {!detail?.isApproved &&
            permissions.includes("accounts.users.verifications.update") && (
              <div className="flex gap-x-5 items-center mt-8">
                <ButtonComponent
                  onClick={() => setRejectOpen(true)}
                  className="w-full text-center !bg-transparent !border !border-[#EAECF0] !text-red-700 dark:!text-red-200  items-center"
                  type="button" // Changed to "button" type for cancel button
                >
                  Reject
                </ButtonComponent>
                <ButtonComponent
                  className="w-full text-center !border !border-primary !bg-primary !text-white items-center"
                  type="submit"
                  isLoading={loading}
                >
                  Approve
                </ButtonComponent>
              </div>
            )}
        </form>
        {isRejectOpen && (
          <CenterModal setOpen={() => setRejectOpen(false)} open={isRejectOpen}>
            <div className="p-6 min-w-[300px]">
              <div className="mb-10">
                <TextField
                  label={`Reason`}
                  name="reason"
                  placeholder=""
                  register={register}
                  errors={errors?.reason}
                  icon={undefined}
                />
              </div>
              <div>
                <ButtonComponent
                  className="w-full text-center !border !border-primary !bg-primary !text-white items-center"
                  type="button"
                  onClick={() =>
                    onSubmit({
                      id: detail?._id || detail?.id,
                      type: "reject",
                      reason: getValues().reason,
                    })
                  }
                  isLoading={loading}
                >
                  Submit
                </ButtonComponent>
              </div>
            </div>
          </CenterModal>
        )}
      </div>
    </CenterModal>
  );
};

export default VerificationStatus;
