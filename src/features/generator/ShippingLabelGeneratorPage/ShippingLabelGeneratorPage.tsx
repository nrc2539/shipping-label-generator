"use client";

import { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as yup from "yup";
import { IconBrandGithubFilled, IconCopy, IconPlus, IconTrash } from "@tabler/icons-react";

import { InputField } from "@/components/form/InputField";
import TextAreaField from "@/components/form/TextAreaField";
import type { ShippingLabelGeneratorPageProps, ShippingLabelFormType } from './interface';
import PreviewPanel from "./components/PreviewPanel";

const recipientSchema = yup.object({
  name: yup.string().trim().required("Recipient name is required"),
  address: yup.string().trim().required("Recipient address is required"),
  phone: yup.string().trim().required("Recipient phone is required"),
  postalCode: yup.string().trim().required("Recipient postal code is required"),
});

const validationSchema = yup.object({
  senderName: yup.string().trim().required("Sender name is required"),
  senderAddress: yup.string().trim().required("Sender address is required"),
  senderPhone: yup.string().trim().required("Sender phone is required"),
  senderPostalCode: yup.string().trim().required("Sender postal code is required"),
  recipients: yup.array().of(recipientSchema).min(1, "At least one recipient is required").required(),
});

function ShippingLabelGeneratorPage({ initialValues }: ShippingLabelGeneratorPageProps) {
  const [submittedData, setSubmittedData] = useState<ShippingLabelFormType | null>(null);

  function handleFormSubmit(values: ShippingLabelFormType) {
    setSubmittedData(values);
  }

  return (
    <div className="p-5 min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <div className="relative">
        <h1 className="text-2xl text-center font-bold text-gray-800 dark:text-white mb-8">
          สร้างใบปะหน้าพัสดุ (Shipping Label Generator)
        </h1>

        <div className="hidden xl:flex absolute top-0 right-0 items-center gap-2">
          <p className="text-center text-sm text-gray-500">
            Made with ❤️ by NRC Dev | 2026
          </p>
          <a
            href="https://github.com/nrc2539/shipping-label-generator"
            target="_blank"
            rel="noopener noreferrer"
            className=" text-gray-500 hover:text-gray-800 dark:text-zinc-400 dark:hover:text-white transition"
          >
            <IconBrandGithubFilled className="size-6" />
          </a>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
        validateOnBlur
        validateOnChange={false}
      >
        {({ values, isValid, dirty }) => (
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
                  <FieldArray name="recipients">
                    {({ push, remove }) => (
                      <div className="space-y-4">
                        {values.recipients.map((_, index) => (
                          <div key={index}>
                            <div
                              className="border border-gray-200 dark:border-zinc-700 rounded-lg p-4 relative"
                            >
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                                ผู้รับที่ {index + 1} (Recipient {index + 1})
                              </h3>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => push({ ...values.recipients[index] })}
                                  className="text-gray-400 hover:text-teal-600 transition cursor-pointer"
                                >
                                  <IconCopy className="size-4" />
                                </button>
                                {values.recipients.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-500 hover:text-red-700 transition cursor-pointer"
                                  >
                                    <IconTrash className="size-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="space-y-0.5">
                              <InputField
                                name={`recipients[${index}].name`}
                                label="ชื่อผู้รับ (Recipient Name)"
                                placeholder="Enter recipient name"
                              />
                              <TextAreaField
                                name={`recipients[${index}].address`}
                                label="ที่อยู่ผู้รับ (Recipient Address)"
                                placeholder="Enter recipient address"
                              />
                              <InputField
                                name={`recipients[${index}].phone`}
                                label="เบอร์โทรผู้รับ (Recipient Phone)"
                                placeholder="Enter recipient phone"
                              />
                              <InputField
                                name={`recipients[${index}].postalCode`}
                                label="รหัสไปรษณีย์ผู้รับ (Recipient Postal Code)"
                                placeholder="Enter recipient postal code"
                              />
                            </div>
                            </div>
                            {index < values.recipients.length - 1 && (
                              <div className="border-t border-dashed border-gray-300 dark:border-zinc-600 my-4" />
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push({ name: "", address: "", phone: "", postalCode: "" })}
                          className="w-full py-2 px-4 border border-dashed border-gray-300 dark:border-zinc-600 rounded-lg text-sm text-gray-600 dark:text-zinc-400 hover:border-teal-500 hover:text-teal-600 transition flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <IconPlus className="size-4" />
                          เพิ่มผู้รับ (Add Recipient)
                        </button>
                      </div>
                    )}
                  </FieldArray>
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