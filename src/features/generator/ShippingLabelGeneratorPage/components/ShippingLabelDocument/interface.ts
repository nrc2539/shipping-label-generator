import { ShippingLabelFormType } from "../../interface";

export interface ShippingLabelDocumentProps {
    data: ShippingLabelFormType;
    layout?: "full" | "quarter";
    copies?: number;
}