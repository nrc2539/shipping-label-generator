"use client";

import ShippingLabelGeneratorPage from "./ShippingLabelGeneratorPage";
import { withShippingGeneratorPage } from "./withShippingGeneratorPage";

const ConnectedShippingLabelGeneratorPage = withShippingGeneratorPage(ShippingLabelGeneratorPage);

export { ConnectedShippingLabelGeneratorPage as ShippingLabelGeneratorPage };