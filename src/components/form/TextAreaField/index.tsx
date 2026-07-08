"use client"
import { useField } from "formik";

import { cn } from '@/libs/utils'

import { TextAreaFieldProps } from './interface'
import { ErrorMessage } from "@/components/ErrorMessage";



export default function TextAreaField({ label, labelClassName, placeholder, name, showError = true, disabled }: TextAreaFieldProps) {
    const [field, { touched, error }] = useField(name);
    const errorMessage = touched && !!error ? error : "";

    return (
        <div>
            {label && (
                <div
                    className={cn(
                        "text-[14px] text-black font-normal mb-1",
                        labelClassName,
                    )}
                >
                    {label}
                </div>
            )}
            <textarea
                {...field}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                    "w-full resize-none min-h-[100px] py-2 px-4 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none [&:focus]:border-teal-500 disabled:bg-gray-200 placeholder:text-gray-400 disabled:text-gray-500",
                    { "border-red-500": !!errorMessage }
                )}
            />
            {showError && (
                <div className={cn({ invisible: !errorMessage })}>
                    <ErrorMessage text={errorMessage || ""} />
                </div>
            )}
        </div>
    )
}
