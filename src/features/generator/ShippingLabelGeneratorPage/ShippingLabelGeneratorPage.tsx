"use client";

import { Formik, Form } from "formik";
import * as yup from "yup";
import dynamic from "next/dynamic";

import { InputField } from "@/components/form/InputField";
import { DropdownField } from "@/components/form/DropdownField";
import type { ShippingLabelGeneratorPageProps } from './interface';
import type { SelectType } from "@/interfaces/SelectType";
import TextAreaField from "@/components/form/TextAreaField";

const layoutOptions: SelectType[] = [
  { label: "Full A4", value: "full" },
  { label: "Quarter A4", value: "quarter" },
];

const ShippingLabelPreview = dynamic(
  () => import("@/features/generator/ShippingLabelGeneratorPage/components/ShippingLabelPreview"),
  { ssr: false },
);

const validationSchema = yup.object({
  senderName: yup.string().trim().required("Sender name is required"),
  senderAddress: yup.string().trim().required("Sender address is required"),
  senderPhone: yup.string().trim().required("Sender phone is required"),
  senderPostalCode: yup.string().trim().required("Sender postal code is required"),
  recipientName: yup.string().trim().required("Recipient name is required"),
  recipientAddress: yup.string().trim().required("Recipient address is required"),
  recipientPhone: yup.string().trim().required("Recipient phone is required"),
  recipientPostalCode: yup.string().trim().required("Recipient postal code is required"),
  labelLayout: yup.string().oneOf(["full", "quarter"]).required("Please select a layout"),
  copies: yup.number().min(1).max(12).required(),
});

function ShippingLabelGeneratorPage({ initialValues, handleSubmit }: ShippingLabelGeneratorPageProps) {
  return (
    <div className="p-5 min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl text-center font-bold text-gray-800 dark:text-white mb-8">
        สร้างใบปะหน้าพัสดุ (Shipping Label Generator)
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur
        validateOnChange={false}
      >
        {({ isValid, dirty, values }) => (

          < div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 p-6 w-full md:max-w-lg">
              <Form className="space-y-6">

                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    ข้อมูลผู้ส่ง (Sender Information)
                  </h2>
                  <div className="space-y-0.5">
                    <InputField
                      name="senderName"
                      label="ชื่อผู้ส่ง (Sender Name)"
                      placeholder="Enter sender name"
                    />
                    <TextAreaField
                      name="senderAddress"
                      label="ที่อยู่ผู้ส่ง (Sender Address)"
                      placeholder="Enter sender address"
                    />
                    <InputField
                      name="senderPhone"
                      label="เบอร์โทรผู้ส่ง (Sender Phone)"
                      placeholder="Enter sender phone"
                    />
                    <InputField
                      name="senderPostalCode"
                      label="รหัสไปรษณีย์ผู้ส่ง (Sender Postal Code)"
                      placeholder="Enter sender postal code"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-zinc-700 pt-6">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    ข้อมูลผู้รับ (Recipient Information)
                  </h2>
                  <div className="space-y-0.5">
                    <InputField
                      name="recipientName"
                      label="ชื่อผู้รับ (Recipient Name)"
                      placeholder="Enter recipient name"
                    />
                    <TextAreaField
                      name="recipientAddress"
                      label="ที่อยู่ผู้รับ (Recipient Address)"
                      placeholder="Enter recipient address"
                    />
                    <InputField
                      name="recipientPhone"
                      label="เบอร์โทรผู้รับ (Recipient Phone)"
                      placeholder="Enter recipient phone"
                    />
                    <InputField
                      name="recipientPostalCode"
                      label="รหัสไปรษณีย์ผู้รับ (Recipient Postal Code)"
                      placeholder="Enter recipient postal code"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-zinc-700 pt-6 flex gap-4">
                  <div className="flex-1">
                    <DropdownField
                      clearable={false}
                      name="labelLayout"
                      label="Layout"
                      options={layoutOptions}
                      placeholder="Select layout"
                    />
                  </div>
                  <div className="w-24">
                    <InputField
                      name="copies"
                      label="Copies"
                      type="number"
                      min={1}
                      max={12}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!(isValid && dirty)}
                  className="w-full py-2.5 px-4 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Generate Label
                </button>
              </Form>
            </div>

            <div className="w-full bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 overflow-hidden aspect-[210/297]">
              <ShippingLabelPreview data={values} layout={values.labelLayout} copies={values.copies} />
            </div>
          </div>
        )
        }
      </Formik >
    </div >
  );
}

export default ShippingLabelGeneratorPage;