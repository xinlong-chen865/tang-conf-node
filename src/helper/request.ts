import { TANGCONF_HOST_TEST, TANGCONF_HOST_PROD } from '@/common/constant';
import type { TangconfHttpResponse } from '@/types';
import { logInfo, logError } from '@/utils/logger';
import { request } from 'https';
import type { RequestOptions } from 'https';
import { stringify } from 'querystring';

const tangconfRequest = <T>(method: 'GET' | 'POST', path: string, token: string, params?: any, isTest = false) => {
    const url = `${isTest ? TANGCONF_HOST_TEST : TANGCONF_HOST_PROD}${path}`;
    const options: RequestOptions = {
        method,
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    return new Promise<T>((resolve, reject) => {
        const req = request(url, options, res => {
            let rawData = '';

            res.on('data', chunk => {
                rawData += chunk;
            });

            res.on('end', () => {
                try {
                    const { result, message, data } = JSON.parse(rawData) as TangconfHttpResponse<T>;

                    if (result === 1) {
                        logInfo(`[request][success] path=${path} method=${method}`);
                        resolve(data);
                    } else {
                        logInfo(`[request][fail] path=${path} method=${method} err=${message}`);
                        reject(new Error(`KconfRequestError: errCode=${result}, errMessage=${message}`));
                    }
                } catch (e: unknown) {
                    logError(`[request] response data format error. path=${path} method=${method} err=${String(e)}`);
                    reject(new Error('KconfRequestError: 返回数据格式错误'));
                }
            });

            res.on('error', e => {
                logError(`[request] request error. path=${path} method=${method} err=${String(e)}`);
                reject(new Error(`KconfRequestError: ${String(e)}`));
            });
        });

        if (method === 'POST' && params) {
            const postData = stringify(params);

            req.write(postData);
        }

        req.end();
    });
};

export const TangconfGet = <T>(path: string, token: string, isTest = false) => {
    return tangconfRequest<T>('GET', path, token, null, isTest);
};

export const TangconfPost = <T>(path: string, token: string, params: any, isTest = false) => {
    return tangconfRequest<T>('POST', path, token, params, isTest);
};
