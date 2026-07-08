import { ShippingLabelFormType, ShippingLabelGeneratorPageProps } from "./interface";

export function withShippingGeneratorPage(Component: React.FC<ShippingLabelGeneratorPageProps>) {
    function WithShippingGeneratorPage() {

        function handleSubmit(values: ShippingLabelFormType) {
            console.log("Form submitted with values:", values);
        }
        const componentProps: ShippingLabelGeneratorPageProps = {
            initialValues: {
                senderName: "",
                senderAddress: "",
                senderPhone: "",
                senderPostalCode: "",
                recipientName: "",
                recipientAddress: "",
                recipientPhone: "",
                recipientPostalCode: ""
            },
            handleSubmit
        }
        return <Component {...componentProps} />;
    }
    return WithShippingGeneratorPage;
}