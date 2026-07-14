import type { ShippingLabelFormType } from "@/features/generator/ShippingLabelGeneratorPage/interface";

export type LabelLayout = "full" | "half" | "quarter";

export interface ShippingLabelPreviewProps {
  data: ShippingLabelFormType;
  layout?: LabelLayout;
  copies?: number;
}
