declare class RetailApiCursor<T = any> {
    private readonly baseUrl;
    private readonly resource;
    private readonly instance;
    private readonly queryString;
    constructor(baseUrl: any, resource: any, instance: any, queryString?: {});
    toArray(): Promise<T[]>;
    [Symbol.asyncIterator](): AsyncGenerator<T, string, boolean>;
}
export default RetailApiCursor;
