"use client";

import { BlobProvider } from "@react-pdf/renderer";

import ShippingLabelDocument from "../ShippingLabelDocument";
import type { ShippingLabelPreviewProps } from "./interface";

export default function ShippingLabelPreview({
  data,
  layout = "full",
  copies = 1,
}: ShippingLabelPreviewProps) {
  return (
    <BlobProvider
      document={<ShippingLabelDocument data={data} layout={layout} copies={copies} />}
    >
      {({ url }) => (
        <iframe
          src={url || undefined}
          style={{ width: "100%", height: "100%", border: "none" }}
          title="PDF Preview"
        />
      )}
    </BlobProvider>
  );
}
