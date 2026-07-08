export interface ShippingLabelGeneratorPageProps {
    initialValues: ShippingLabelFormType;
    handleSubmit: (values: ShippingLabelFormType) => void;
}

export type ShippingLabelFormType = {
    senderName: string;
    senderAddress: string;
    senderPhone: string;
    senderPostalCode: string;
    recipientName: string;
    recipientAddress: string;
    recipientPhone: string;
    recipientPostalCode: string;
    labelLayout: "full" | "quarter";
    copies: number;
}