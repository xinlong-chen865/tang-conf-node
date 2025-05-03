// 默认保存 1000 项配置
// 使用 'configChange' 功能时需要注意，如果缓存配置项超过 LRU_MAX，那么移除的配置将不再被监听
export const LRU_MAX = 1000;

// 线上 Tangconf 平台
export const TANGCONF_HOST_PROD = 'http://127.0.0.1';

// 测试 Tangconf 平台
export const TANGCONF_HOST_TEST = 'http://127.0.0.1';

// 更新不同环境配置值结果（版本一致性检查）
export enum CasUpdateConfigStatus {
    FAIL = 0,
    SUCCESS = 1,
    ALREADY_EQUAL = 2,
}
