"use client";

import { useState, useEffect, useRef } from "react";
import { pdf } from "@react-pdf/renderer";

import { Dropdown } from "@/components/Dropdown";
import Input from "@/components/Input";
import type { SelectType } from "@/interfaces/SelectType";
import { PreviewPanelProps } from "./interface";
import ShippingLabelDocument from "../ShippingLabelDocument";

const layoutOptions: SelectType[] = [
  { label: "Full A4", value: "full" },
  { label: "Quarter A4", value: "quarter" },
];



export default function PreviewPanel({ data }: PreviewPanelProps) {
  const [layout, setLayout] = useState<"full" | "quarter">("full");
  const [copies, setCopies] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const revokeRef = useRef<string | null>(null);

  useEffect(() => {
    if (!data) return;

    setIsGenerating(true);
    setPreviewUrl(null);

    let cancelled = false;

    (async () => {
      const blob = await pdf(
        <ShippingLabelDocument data={data} layout={layout} copies={copies} />
      ).toBlob();
      if (cancelled) return;

      if (revokeRef.current) {
        URL.revokeObjectURL(revokeRef.current);
      }
      const url = URL.createObjectURL(blob);
      revokeRef.current = url;
      setPreviewUrl(`${url}#zoom=PageFit`);
      setIsGenerating(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [data, layout, copies]);

  useEffect(() => {
    return () => {
      if (revokeRef.current) {
        URL.revokeObjectURL(revokeRef.current);
      }
    };
  }, []);

  async function handleDownload() {
    if (!data) return;
    const blob = await pdf(
      <ShippingLabelDocument data={data} layout={layout} copies={copies} />
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shipping-label.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  if (!data) {
    return (
      <div className="w-full bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 p-6 flex items-center justify-center aspect-[210/297]">
        <p className="text-gray-400 dark:text-zinc-500 text-center text-sm">
          Fill in the form and click <strong>Preview Label</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 overflow-hidden">
      <div className="p-3 border-b border-gray-200 dark:border-zinc-700 flex gap-3 items-end">
        <div className="flex-1">
          <Dropdown
            showError={false}
            value={layout}
            options={layoutOptions}
            onSelect={(v) => setLayout(v as "full" | "quarter")}
            label="Layout"
            placeholder="Select layout"
          />
        </div>
        <div className="w-20">
          <Input
            showError={false}
            type="number"
            label="Copies"
            value={copies}
            min={1}
            max={12}
            onChange={(e) => setCopies(Math.min(12, Math.max(1, Number(e.target.value))))}
          />
        </div>
        <button
          type="button"
          onClick={handleDownload}
          className="px-3 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 transition"
        >
          Download
        </button>
      </div>

      <div className="aspect-[210/297] relative">
        {isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white dark:bg-zinc-900">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-teal-600 border-t-transparent" />
            <span className="text-sm text-gray-500 dark:text-zinc-400">Generating preview...</span>
          </div>
        ) : previewUrl ? (
          <iframe
            src={previewUrl}
            style={{ width: "100%", height: "100%", border: "none" }}
            title="PDF Preview"
          />
        ) : null}
      </div>
    </div>
  );
}
