export interface ShippingLabelGeneratorPageProps {
    initialValues: ShippingLabelFormType;
}

export type RecipientType = {
    name: string;
    address: string;
    phone: string;
    postalCode: string;
}

export type ShippingLabelFormType = {
    senderName: string;
    senderAddress: string;
    senderPhone: string;
    senderPostalCode: string;
    recipients: RecipientType[];
}