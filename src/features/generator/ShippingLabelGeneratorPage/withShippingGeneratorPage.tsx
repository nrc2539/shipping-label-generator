import { ShippingLabelFormType, ShippingLabelGeneratorPageProps } from "./interface";

export function withShippingGeneratorPage(Component: React.FC<ShippingLabelGeneratorPageProps>) {
    function WithShippingGeneratorPage() {

        const componentProps: ShippingLabelGeneratorPageProps = {
            initialValues: {
                senderName: "",
                senderAddress: "",
                senderPhone: "",
                senderPostalCode: "",
                recipientName: "",
                recipientAddress: "",
                recipientPhone: "",
                recipientPostalCode: "",
            },
        }
        return <Component {...componentProps} />;
    }
    return WithShippingGeneratorPage;
}