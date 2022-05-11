import { AxiosInstance } from 'axios';
declare class EcomApiCursor<T> {
    private readonly baseUrl;
    private readonly axiosClient;
    private readonly filters;
    private readonly resource;
    private recordCount;
    constructor(baseUrl: string, axiosClient: AxiosInstance, resource: string, filters?: {});
    getCount(): Promise<number>;
    toArray(): Promise<T[]>;
    items(): AsyncGenerator<T, string, boolean>;
}
export default EcomApiCursor;
