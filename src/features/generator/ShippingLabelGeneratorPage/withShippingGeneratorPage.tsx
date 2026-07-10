import { ShippingLabelGeneratorPageProps } from "./interface";

export function withShippingGeneratorPage(Component: React.FC<ShippingLabelGeneratorPageProps>) {
    function WithShippingGeneratorPage() {

        const componentProps: ShippingLabelGeneratorPageProps = {
            initialValues: {
                senderName: "",
                senderAddress: "",
                senderPhone: "",
                senderPostalCode: "",
                recipients: [
                    { name: "", address: "", phone: "", postalCode: "" },
                ],
            },
        }
        return <Component {...componentProps} />;
    }
    return WithShippingGeneratorPage;
}