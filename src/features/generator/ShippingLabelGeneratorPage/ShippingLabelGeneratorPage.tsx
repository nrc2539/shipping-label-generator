"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import { InputField } from "@/components/form/InputField";
import type { ShippingLabelGeneratorPageProps, ShippingLabelFormType } from './interface';
import TextAreaField from "@/components/form/TextAreaField";
import PreviewPanel from "./components/PreviewPanel";

const validationSchema = yup.object({
  senderName: yup.string().trim().required("Sender name is required"),
  senderAddress: yup.string().trim().required("Sender address is required"),
  senderPhone: yup.string().trim().required("Sender phone is required"),
  senderPostalCode: yup.string().trim().required("Sender postal code is required"),
  recipientName: yup.string().trim().required("Recipient name is required"),
  recipientAddress: yup.string().trim().required("Recipient address is required"),
  recipientPhone: yup.string().trim().required("Recipient phone is required"),
  recipientPostalCode: yup.string().trim().required("Recipient postal code is required"),
});

function ShippingLabelGeneratorPage({ initialValues }: ShippingLabelGeneratorPageProps) {
  const [submittedData, setSubmittedData] = useState<ShippingLabelFormType | null>(null);

  function handleFormSubmit(values: ShippingLabelFormType) {
    setSubmittedData(values);
  }

  return (
    <div className="p-5 min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl text-center font-bold text-gray-800 dark:text-white mb-8">
        สร้างใบปะหน้าพัสดุ (Shipping Label Generator)
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
        validateOnBlur
        validateOnChange={false}
      >
        {({ isValid, dirty }) => (
          <div className="flex flex-col md:flex-row gap-6 items-start">
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

                <button
                  type="submit"
                  disabled={!(isValid && dirty)}
                  className="w-full py-2.5 px-4 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Preview Label
                </button>
              </Form>
            </div>

            <PreviewPanel data={submittedData} />
          </div>
        )}
      </Formik>
    </div>
  );
}

export default ShippingLabelGeneratorPage;