export enum ConfigType {
    NULL = 0,
    INT32 = 1,
    INT64 = 2,
    DOUBLE = 3,
    BOOLEAN = 4,
    STRING = 5,
    BYTES = 6,
    LIST = 7,
    MAP = 8,
    ENCRYPT = 9,
    GZIP = 10,
}

export type EnvOptions = 'prod' | 'staging' | 'test';

export interface TangconfOptions {
    division?: string;
    env?: EnvOptions;
    serviceName?: string;
    maxCache?: number;
}

export interface TangconfHttpResponse<T> {
    result: number;
    message: string;
    data: T;
}

// 获取配置
export interface TangconfHttpGetConfigResponseData {
    key: string;
    description: string;
    type: string;
    version: number;
    status: string;
    creator: string;
    modifier: string;
    createdDate: string;
    modifiedDate: string;
    subConfigs: {
        snapshotId: number;
        stage: string;
        data: any;
        modifier: string;
        modifiedDate: string;
    }[];
}
