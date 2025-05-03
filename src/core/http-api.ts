import { TangconfGet } from '@/helper/request';
import type { TangconfHttpGetConfigResponseData } from '@/types';

/**
 * 获取配置
 * @param key 配置名
 * @param token
 * @param isTest 是否请求测试环境
 * @returns 配置信息
 */
export const getConfig = (key: string, token: string, isTest = false) => {
    const path = `/api/config/get?key=${key}`;

    return TangconfGet<TangconfHttpGetConfigResponseData>(path, token, isTest);
};
