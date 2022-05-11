import EcomApiCursor from '../utils/EcomApiCursor';
import { Account, Order, OrderProduct, ProductVariant } from './EcomTypes';
declare type ClusterId = 'eu1' | 'EU1' | 'us1' | 'US1';
declare type AllowedOptions = {
    apiKey: string;
    apiSecret: string;
    clusterId: ClusterId;
    language?: string;
};
declare class LightspeedEcomApi {
    private axiosClient;
    constructor(opts: AllowedOptions);
    static __validate(opts: any): void;
    getAccount(): Promise<Account>;
    getOrders(): EcomApiCursor<Order>;
    getOrderProducts(orderId: number): EcomApiCursor<OrderProduct>;
    getProductVariants(productId: number): Promise<ProductVariant[]>;
    getVariant(variantId: number): Promise<ProductVariant>;
}
export default LightspeedEcomApi;
