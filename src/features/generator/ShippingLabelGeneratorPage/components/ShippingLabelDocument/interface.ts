import { ShippingLabelFormType } from "../../interface";
import { LabelLayout } from "../ShippingLabelPreview/interface";

export interface ShippingLabelDocumentProps {
    data: ShippingLabelFormType;
    layout?: LabelLayout;
    copies?: number;
}