export interface ShippingLabelGeneratorPageProps {
    initialValues: ShippingLabelFormType;
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
}