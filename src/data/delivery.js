export const STANDARD_DELIVERY_FEE = 2500;
export const FREE_DELIVERY_THRESHOLD = 500000;

export const getDeliveryFee = (subtotal) => (
    subtotal > FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE
);
