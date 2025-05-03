import { Tangconf } from './core/tangconf';
import type { TangconfOptions } from './types';

let tangconf: Tangconf | null = null;
let currentEnv = '';

export const createTangconf = (options?: TangconfOptions) => {
    if (!tangconf) {
        tangconf = new Tangconf(options);
        currentEnv = options?.env ?? '';
    } else if (currentEnv !== options?.env) {
        // eslint-disable-next-line no-console
        console.warn(
            // eslint-disable-next-line max-len
            `TangconfWarning: 创建了不同环境的 Tangconf 实例，新创建 Tangconf 实例的 env 为 '${String(
                options?.env,
            )}'，由于全局仅可以创建一个 Tangconf 实例，因而当前 Tangconf 实例的 env 仍为第一次创建的值，即 '${currentEnv}'`,
        );
    }

    return tangconf;
};

export type KconfConstructor = InstanceType<typeof Kconf>;

export * as TangconfHttpApi from './core/http-api';
